four51.app.controller('SupportTicketCtrl', ['$routeParams', '$location', '$route', '$scope', '$451', 'User',
	function ($routeParams, $location, $route, $scope, $451, User) {
		$scope.newTicket = function() {
			return {
				description: '',
				subject: 'eCommerce Ticket Request',
				upload: null,
				jobType: '',
				currentSku: '',
				newSku: '',
				productName: '',
				category: '',
				unique_id: ''
			};
		}

		$scope.noteModal = $('#supportTicketNoteModal');
		$scope.modal = $('#supportTicketModal');
		$scope.hasTickets = false;
		$scope.tickets = [];
		$scope.ticket = $scope.newTicket();
		$scope.categories = [];

		$scope.tree.forEach(function(c) {
			$scope.categories.push(c.Name);
			c.SubCategories.forEach(function(sc) {
				$scope.categories.push("- " + sc.Name)
			})
			// $scope.categories.push(c.SubCategories);
		});

		$scope.subcategories = $scope.categories.flat(Infinity);

		$scope.noteDate = function(note) {
			return note.split('<note_parts>')[0];
		}

		$scope.noteText = function(note) {
			return note.split('<note_parts>')[1].trim();
		}

		$scope.createTicket = function(form) {
			if (this.ticket.upload && this.ticket.upload.base64 === 'invalid-size') this.ticket.upload = undefined;
			let category = this.ticket.category.replace('- ','');
			var data = {
				companyName : this.user.Company.Name.trim(),
				firstName: this.user.FirstName.trim(),
				lastName: this.user.LastName.trim(),
				email: this.user.Email.trim(),
				subject: this.ticket.subject,
				description: this.ticket.description,
				productName: this.ticket.productName,
				jobType: this.ticket.jobType,
				currentSku: this.ticket.currentSku,
				newSku: this.ticket.newSku,
				category: category,
				upload: this.ticket.upload,
				source: 'four51',
				userId: this.user.ID
			}

			var modal = this.modal;
			var test = (window.location.host === 'teststore.four51.com') ? '-test' : '';
			var token = (window.location.host === 'teststore.four51.com') ? 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJhcHBsaWNhdGlvbklkIjozLCJjbGllbnRJZCI6NSwiYXV0aG9yaXplZCI6dHJ1ZX0.4w9s6Cf_OQYsk8SluOIR5WGpif28j4h_qDmYJrX0OC8' : 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJhcHBsaWNhdGlvbklkIjozLCJjbGllbnRJZCI6NSwiYXV0aG9yaXplZCI6dHJ1ZX0.4w9s6Cf_OQYsk8SluOIR5WGpif28j4h_qDmYJrX0OC8';
			modal.find('.working-message').removeClass('hide');
			modal.find('.action-buttons').addClass('hide');

			$.ajax({
				url: 'https://vampire.vividimpact.com/api' + test + '/create-ticket',
				type: 'POST',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + token);
				},
				data: data,
				dataType: 'json'
			}).done(function(result) {
				if ('Code' in result && 'Message' in result && 'Content' in result && 'TicketNumber' in result.Content) {
					//this is a valid response
					if (result.Code === 0) {
						$scope.getTickets();
						alert('Support ticket ' + result.Content.TicketNumber + ' has been created.');
					} else {
						alert('Error creating support ticket: ' + result.Message);
					}
				} else {
					console.log(result);
					alert('There was an invalid response when trying to create a support ticket, please try again.  If the problem persists, please email orders@vividimpact.com');
				}
			}).complete(function() {
				closeModal(modal);
			}).error(function() {
				alert('There was an unknown error trying to create a support ticket, please try again.  If the problem persists, please email orders@vividimpact.com');
			});
		}

		function closeModal(modal) {
			modal.addClass('fade').hide();
		}

		$scope.showModal = function() {
			if ($scope.user.AllowTicketing === true) {
				$scope.ticket = $scope.newTicket();
				this.modal.find('.working-message').addClass('hide');
				this.modal.find('.action-buttons').removeClass('hide');
				this.modal.removeClass('fade').fadeIn('fast');
			} else {
				alert('User is not setup to enter support tickets.');
			}
		}

		$scope.closeModal = function() {
			closeModal(this.modal);
		};

		$scope.showNoteModal = function(unique_id) {
			if ($scope.user.AllowTicketing === true) {
				$scope.ticket = $scope.newTicket();
				$scope.ticket.unique_id = unique_id;
				this.noteModal.find('.working-message').addClass('hide');
				this.noteModal.find('.action-buttons').removeClass('hide');
				this.noteModal.removeClass('fade').fadeIn('fast');
			} else {
				alert('User is not setup to enter support tickets.');
			}
		}

		$scope.closeNoteModal = function() {
			closeModal(this.noteModal);
		};

		$scope.createTicketNote = function(form) {
			var data = {
				companyName : this.user.Company.Name.trim(),
				firstName: this.user.FirstName.trim(),
				lastName: this.user.LastName.trim(),
				email: this.user.Email.trim(),
				subject: this.ticket.subject,
				description: this.ticket.description,
				source: 'four51',
				userId: this.user.ID,
				uniqueId: this.ticket.unique_id
			}

			var modal = this.noteModal;
			var test = (window.location.host === 'teststore.four51.com') ? '-test' : '';
			var token = (window.location.host === 'teststore.four51.com') ? 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJhcHBsaWNhdGlvbklkIjozLCJjbGllbnRJZCI6NSwiYXV0aG9yaXplZCI6dHJ1ZX0.4w9s6Cf_OQYsk8SluOIR5WGpif28j4h_qDmYJrX0OC8' : 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJhcHBsaWNhdGlvbklkIjozLCJjbGllbnRJZCI6NSwiYXV0aG9yaXplZCI6dHJ1ZX0.4w9s6Cf_OQYsk8SluOIR5WGpif28j4h_qDmYJrX0OC8';
			modal.find('.working-message').removeClass('hide');
			modal.find('.action-buttons').addClass('hide');

			$.ajax({
				url: 'https://vampire.vividimpact.com/api' + test + '/add-note',
				type: 'POST',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + token);
				},
				data: data,
				dataType: 'json'
			}).done(function(result) {
				if ('Code' in result && 'Message' in result && 'Content' in result) {
					//this is a valid response
					if (result.Code === 0) {
						$scope.getTickets();
						alert('Support ticket has been updated.');
					} else {
						alert('Error creating support ticket note: ' + result.Message);
					}
				} else {
					console.log(result);
					alert('There was an invalid response when trying to create a support ticket note, please try again.  If the problem persists, please email orders@vividimpact.com');
				}
			}).complete(function() {
				closeModal(modal);
			}).error(function() {
				alert('There was an unknown error trying to create a support ticket note, please try again.  If the problem persists, please email orders@vividimpact.com');
			});
		}

		$scope.getTickets = function() {
			var data = {
				companyName : this.user.Company.Name.trim(),
				firstName: this.user.FirstName.trim(),
				lastName: this.user.LastName.trim(),
				email: this.user.Email.trim(),
				source: 'four51',
				userId: this.user.ID
			}

			var test = (window.location.host === 'teststore.four51.com') ? '-test' : '';
			var token = (window.location.host === 'teststore.four51.com') ? 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJhcHBsaWNhdGlvbklkIjozLCJjbGllbnRJZCI6NSwiYXV0aG9yaXplZCI6dHJ1ZX0.4w9s6Cf_OQYsk8SluOIR5WGpif28j4h_qDmYJrX0OC8' : 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJhcHBsaWNhdGlvbklkIjozLCJjbGllbnRJZCI6NSwiYXV0aG9yaXplZCI6dHJ1ZX0.4w9s6Cf_OQYsk8SluOIR5WGpif28j4h_qDmYJrX0OC8';

			$.ajax({
				url: 'https://vampire.vividimpact.com/api' + test + '/tickets',
				type: 'POST',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + token);
				},
				data: data,
				dataType: 'json'
			}).done(function(result) {
				$scope.tickets = [];
				$scope.hasTickets = false;

				if ('Code' in result && 'Message' in result && 'Content' in result && 'Tickets' in result.Content) {
					//this is a valid response
					if (result.Code === 0) {
						$scope.hasTickets = (result.Content.Count > 0);
						$scope.tickets = result.Content.Tickets;
						$scope.$apply();
					} else {
						alert('Error loading support tickets: ' + result.Message);
					}
				} else {
					console.log(result);
					alert('There was an invalid response when trying to load support tickets, please try again.  If the problem persists, please email orders@vividimpact.com');
				}
			}).complete(function() {

			}).error(function() {
				alert('There was an unknown error trying to load support tickets, please try again.  If the problem persists, please email orders@vividimpact.com');
			});
		}

		if ($scope.user.TicketingDashboard === true)	$scope.getTickets();

		angScope = $scope;
	}]);
