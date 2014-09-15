four51.app.directive('creditcard', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/creditCard.html',
		controller: ['$scope', function($scope) {
			function validateType(type) {
				if (!type) // denotes a type we dont' even support.
					return true;
				if (type == 'AmericanExpress')
					return $scope.user.Permissions.contains('PayByAmex');
				else
					return $scope.user.Permissions.contains('PayBy' + type);
			}
			function validateNumber(ccNumb) {
				/* This script and many more are available free online at
				 The JavaScript Source!! http://javascript.internet.com
				 Created by: David Leppek :: https://www.azcode.com/Mod10

				 Basically, the alorithum takes each digit, from right to left and muliplies each second
				 digit by two. If the multiple is two-digits long (i.e.: 6 * 2 = 12) the two digits of
				 the multiple are then added together for a new number (1 + 2 = 3). You then add up the
				 string of numbers, both unaltered and new values and get a total sum. This sum is then
				 divided by 10 and the remainder should be zero if it is a valid credit card. Hense the
				 name Mod 10 or Modulus 10. */
				var valid = "0123456789",  // Valid digits in a credit card number
					len = ccNumb.length,  // The length of the submitted cc number
					iCCN = parseInt(ccNumb),  // integer of ccNumb
					sCCN = ccNumb.toString().replace(/^\s+|\s+$/g,''),  // string of ccNumb
					iTotal = 0,  // integer total set at zero
					bNum = true,  // by default assume it is a number
					bResult = false,  // by default assume it is NOT a valid cc
					temp,  // temp variable for parsing string
					calc;  // used for calculation of each digit

				// Determine if the ccNumb is in fact all numbers
				for (var j=0; j<len; j++) {
					temp = "" + sCCN.substring(j, j+1);
					if (valid.indexOf(temp) == "-1"){bNum = false;}
				}

				// if it is NOT a number, you can either alert to the fact, or just pass a failure
				if(!bNum) bResult = false;

				// Determine if it is the proper length
				if((len == 0) && (bResult))  // nothing, field is blank AND passed above # check
					bResult = false;
				else {  // ccNumb is a number and the proper length - let's see if it is a valid card number
					if(len >= 14){  // 15 or 16 for Amex or V/MC
						for(var i=len;i>0;i--){  // LOOP throught the digits of the card
							calc = parseInt(iCCN) % 10;  // right most digit
							calc = parseInt(calc);  // assure it is an integer
							iTotal += calc;  // running total of the card number as we loop - Do Nothing to first digit
							i--;  // decrement the count - move to the next digit in the card
							iCCN = iCCN / 10;                               // subtracts right most digit from ccNumb
							calc = parseInt(iCCN) % 10 ;    // NEXT right most digit
							calc = calc *2;                                 // multiply the digit by two
							// Instead of some screwy method of converting 16 to a string and then parsing 1 and 6 and then adding them to make 7,
							// I use a simple switch statement to change the value of calc2 to 7 if 16 is the multiple.
							switch(calc){
								case 10: calc = 1; break;       //5*2=10 & 1+0 = 1
								case 12: calc = 3; break;       //6*2=12 & 1+2 = 3
								case 14: calc = 5; break;       //7*2=14 & 1+4 = 5
								case 16: calc = 7; break;       //8*2=16 & 1+6 = 7
								case 18: calc = 9; break;       //9*2=18 & 1+8 = 9
								default: calc = calc;           //4*2= 8 &   8 = 8  -same for all lower numbers
							}
							iCCN = iCCN / 10;  // subtracts right most digit from ccNum
							iTotal += calc;  // running total of the card number as we loop
						}  // END OF LOOP
						if ((iTotal%10)==0)  // check to see if the sum Mod 10 is zero
							bResult = true;  // This IS (or could be) a valid credit card number.
						else
							bResult = false;  // This could NOT be a valid credit card number
					}
				}
				return bResult;
			};

			$scope.$watch('currentOrder.CreditCard.AccountNumber', function(ccnumber) {
				//http://tamas.io/custom-angularjs-filter-to-determine-credit-card-type/
				if (!ccnumber) return;
				$scope.currentOrder.CreditCard.Type = null;
				$scope.creditCardIconUrl = null;
				var len = ccnumber.length;
				if (ccnumber && len >= 4) {
					var cardType,
						mul = 0,
						prodArr = [
							[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
							[0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
						],
						sum = 0;

					while (len--) {
						sum += prodArr[mul][parseInt(ccnumber.charAt(len), 10)];
						mul ^= 1;
					}

					if(/^(34)|^(37)/.test(ccnumber)) {
						cardType = "AmericanExpress";
					}
					if(/^30[0-5]/.test(ccnumber)) {
						cardType = "DinersClub"; //Carte Blanche
					}
					if(/^(2014)|^(2149)/.test(ccnumber)) {
						cardType = "DinersClub"; //enRoute
					}
					if(/^36/.test(ccnumber)) {
						cardType = "DinersClub"; //International
					}
					if(/^(6011)|^(622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|^(64[4-9])|^65/.test(ccnumber)) {
						cardType = "Discover";
					}
					if(/^35(2[89]|[3-8][0-9])/.test(ccnumber)) {
						cardType = "JCB";
					}
					if(/^(6304)|^(6706)|^(6771)|^(6709)/.test(ccnumber)) {
						cardType = "Laser"; //Laser
					}
					if(/^(5018)|^(5020)|^(5038)|^(5893)|^(6304)|^(6759)|^(6761)|^(6762)|^(6763)|^(0604)/.test(ccnumber)) {
						cardType = "Switch"; //Maestro
					}
					if(/^5[1-5]/.test(ccnumber)) {
						cardType = "MasterCard";
					}
					if (/^4/.test(ccnumber)) {
						cardType = "Visa";
					}
					if (/^(4026)|^(417500)|^(4405)|^(4508)|^(4844)|^(4913)|^(4917)/.test(ccnumber)) {
						cardType = "Electron"; //Visa Electron
					}
					$scope.currentOrder.CreditCard.Type = cardType;
					$scope.creditCardIconUrl = cardType ? 'css/images/CreditCardIcons/' + cardType + '.png' : null;

					ccnumber = ccnumber.toString().replace(/\s+/g, '');
					//$scope.cart_billing.$setValidity('creditCardNumber', true);
					$scope.cart_billing.$setValidity('creditCardNumber', validateNumber(ccnumber));
					$scope.cart_billing.$setValidity('creditCardType', validateType(cardType));
				}
			});

			$scope.$watch('currentOrder.CreditCard.CVN', function(cvn) {
				if (!cvn || $scope.currentOrder.CreditCard.Type == null) return false;

				function validate(cvn) {
					if ($scope.currentOrder.CreditCard.Type == 'AmericanExpress')
						return cvn.length == 4;
					return cvn.length == 3;
				}
				$scope.cart_billing.$setValidity('cvnNumber', validate(cvn));
			});

			$scope.$watch('currentOrder.CreditCard.ExpirationDate', function(date) {
				if (!date) return false;
				var month = parseInt(date.substring(0,2));
				var year = parseInt(date.substring(2,4)) + 2000;
				var current = new Date();
				var valid = (month > 0 && month < 13) && (year > current.getFullYear());
				$scope.cart_billing.$setValidity('expDate', valid);
			});

			$scope.friendlyName = function(type) {
				switch(type) {
					case 'AmericanExpress':
						return 'American Express'
					case 'DinersClub':
						return 'Diners Club'
					default:
						return type;
				}
			}
		}]
	};
	return obj;
});