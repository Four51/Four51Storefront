var hasLogoSelection = false;
var groupDisplayOrder = [
	'Contact',
	'Phone',
	'Primary Phone',
	'Secondary Phone',
	'Phone 2',
	'Phone 3',
	'Phone 4',
	'Administrator Info',
	'Administrator Phone',
	'Clinical Manager Info',
	'Clinical Manager Phone',
	'Info Phone Number',
	'Phone 5',
	'Toll Free',
	'Referral Phone',
	'Fax Number',
	'Fax',
	'Fax 2',
	'Toll Free Fax',
	'Toll FreeFax',
	'TDD/TTY',
	'TDD/TTY ABBR',
	'Cell Phone',
	'Personalization',
	'Intake Fax Number',
	'Hourly Care Pricing',
	'Consulting Line',
	'Kindred Palliative Fax',
	'Kindred Palliative Email',
	'Specialty Programs'
];
var inlineFields = [
	'Code',
	'Prefix',
	'Number'
];
var address1Spec = '';
var address2Spec = '';
var citySpec = '';
var stateSpec = '';
var zipcodeSpec = '';
var phoneAcSpec = '';
var phonePrefixSpec = '';
var phoneNumberSpec = '';
var faxAcSpec = '';
var faxPrefixSpec = '';
var faxNumberSpec = '';
var tollFreeAcSpec = '';
var tollFreePrefixSpec = '';
var tollFreeNumberSpec = '';
var webSpec = '';
var facilityNameSpec = '';
var hhaSpec = '';
var ttySpec = '';
var ttyAbbrSpec = '';
var intakeNumSpec = '';
var formerNameSpec = '';
var vetLogoSpec = '';

function drawForm_textbased() {
	var template = {};

	var textFormMarkup = '\
		<div>\
			<section id="customFormContent" class="specform-default">\
				<div class="row">\
					<div class="col-md-1"></div>\
					<div id="specFormPreviewContainer" class="col-12 col-md-4" style="margin-top: 75px">\
							<specformpreview style="position: relative" variant="Variant" product="Product" varianterrors="variantErrors" previewvariant="PreviewVariant"></specformpreview>\
						</div>\
						<div id="specFormContent" class="col-12 col-md-6" style="padding: 25px 15px 0px 15px;">\
						</div>\
					</div>\
				</div>\
			</section>\
		</div>';

	function getStateElements() {
		let output = '';
		for (var i in statesData) {
			output += '<option value="' + statesData[i] + '">' + statesData[i] + '</option>';
		}
		return output;
	}

	function renderSpecFormContent() {
		// Prepare spec data
		// Place into logical groups:
		var groupedSpecData = [];
		for (var x in specs) {
			for (var y in angScope.Product.Specs) {
				if (y == specs[x].spec) { // Only get groups that have relevant specs in the product
					if (typeof groupedSpecData[specs[x].group] !== 'undefined') {
						groupedSpecData[specs[x].group].push(specs[x]);
					} else {
						groupedSpecData[specs[x].group] = [specs[x]];
					}
				}
			}
		}
		// Sort groups by groupDisplayOrder:
		var sortedGroupSpecData = [];
		for (var e in groupDisplayOrder) {
			for (var f in groupedSpecData) {
				if (f == groupDisplayOrder[e]) {
					sortedGroupSpecData[f] = groupedSpecData[f];
				}
			}
		}
		var content = '';
		// Logo picker
		for (var y in angScope.Product.Specs) {
			if (y == 'LogoSelection') {
				hasLogoSelection = true;
				var options = '';
				for (var z in logoOptions) {
					options += '<option value="' + logoOptions[z] + '">' + logoOptions[z] + '</option>';
				}
				content += '<div style="font-size: 11px; margin-bottom: 25px;"><label for="logo">Choose a facility / division</label><select id="logo" class="form-control nopad" required><option value="" selected disabled>Make a selection...</option>' + options + '</select></div>';
				break;
			}
		}
		// Everything else
		for (var x in sortedGroupSpecData) {
			var specGroup = sortedGroupSpecData[x];
			var allFieldsHidden = true;
			for (var i in specGroup) {
				if (specGroup[i].type !== 'hidden') {
					allFieldsHidden = false;
				}
			}
			if (allFieldsHidden) {
				continue; // Every field in this section is hidden, so hide the section
			}
			content += '<fieldset class="formFieldset">';
			content += '<legend class="noMargin">' + x + '</legend>';
			for (var i in specGroup) {
				var specItem = specGroup[i];
				// Check and populate address info
				if (specItem.label == 'Address 1') {
					address1Spec = specItem.spec;
				}
				if (specItem.label == 'Address 2') {
					address2Spec = specItem.spec;
				}
				if (specItem.label == 'City') {
					citySpec = specItem.spec;
				}
				if (specItem.label == 'State') {
					stateSpec = specItem.spec;
				}
				if (specItem.label == 'Zip Code') {
					zipcodeSpec = specItem.spec;
				}
				if (specItem.label == 'Web Address') {
					webSpec = specItem.spec;
				}
				if (specItem.label == 'Facility Name') {
					facilityNameSpec = specItem.spec;
				}
				if (specItem.label == 'Code' && specItem.group == 'Phone') {
					phoneAcSpec = specItem.spec;
				}
				if (specItem.label == 'Prefix' && specItem.group == 'Phone') {
					phonePrefixSpec = specItem.spec;
				}
				if (specItem.label == 'Number' && specItem.group == 'Phone') {
					phoneNumberSpec = specItem.spec;
				}
				if (specItem.label == 'Code' && specItem.group == 'Fax Number') {
					faxAcSpec = specItem.spec;
				}
				if (specItem.label == 'Prefix' && specItem.group == 'Fax Number') {
					faxPrefixSpec = specItem.spec;
				}
				if (specItem.label == 'Number' && specItem.group == 'Fax Number') {
					faxNumberSpec = specItem.spec;
				}
				if (specItem.label == 'Code' && specItem.group == 'Toll Free') {
					tollFreeAcSpec = specItem.spec;
				}
				if (specItem.label == 'Prefix' && specItem.group == 'Toll Free') {
					tollFreePrefixSpec = specItem.spec;
				}
				if (specItem.label == 'Number' && specItem.group == 'Toll Free') {
					tollFreeNumberSpec = specItem.spec;
				}
				if (specItem.label == 'HHA') {
					hhaSpec = specItem.spec;
				}
				if (specItem.label == 'TTY') {
					ttySpec = specItem.spec;
				}
				if (specItem.label == 'ABBR') {
					ttyAbbrSpec = specItem.spec;
				}
				if (specItem.label == 'Central Intake') {
					intakeNumSpec = specItem.spec;
				}
				if (specItem.label == 'Legacy Name') {
					formerNameSpec = specItem.spec;
				}
				if (specItem.label == 'Vet Logo') {
					vetLogoSpec = specItem.spec;
				}
				// Prepare form fields
				if (specItem.type == 'Text') {
					if (specItem.display_label == '0') {
						content += '<span class="hideLabel">';
					}
					if (inlineFields.indexOf(specItem.label) != -1) {
						content += '<span class="inlineField">';

					}
					if (specItem.label == 'State') {
						// These are drawn differently
						if (angScope.Variant.Specs[stateSpec].Required === true) {
							required = 'required';
						} else {
							required = '';
						}
						content += '<div style="font-size: 11px; margin-top: 15px;"><label for="state">State</label><select id="state" class="form-control" ' + required + '><option value="" selected>Choose a state</option>' + getStateElements() + '</select></div>';
					} else {
						if (specItem.label == 'Zip Code') {
							content += '<octextfield class="nopad" hideprefix="true" customfield="Variant.Specs.' + specItem.spec + '" label="' + specItem.label + '"></octextfield>';
						} else {
							content += '<octextfield class="nopad" customfield="Variant.Specs.' + specItem.spec + '" label="' + specItem.label + '"></octextfield>';
						}
					}
					if (specItem.display_label == '0') {
						content += '</span>';
					}
					if (inlineFields.indexOf(specItem.label) != -1) {
						content += '</span>';

					}
				}
				if (specItem.type == 'Selection') {
					if (specItem.display_label == '0') {
						content += '<span class="hideLabel">';
					}
					if (inlineFields.indexOf(specItem.label) != -1) {
						content += '<span class="inlineField">';

					}
					content += '<customselectionfield class="nopad" customfield="Variant.Specs.' + specItem.spec + '" label="' + specItem.label + '"></customselectionfield>';
					if (specItem.display_label == '0') {
						content += '</span>';
					}
					if (inlineFields.indexOf(specItem.spec)) {
						content += '</span>';

					}
				}
				if (specItem.type == 'File') {
					if (specItem.display_label == '0') {
						content += '<span class="hideLabel">';
					}
					if (inlineFields.indexOf(specItem.label) != -1) {
						content += '<span class="inlineField">';

					}
					content += '<customfilefield class="nopad" customfield="Variant.Specs.' + specItem.spec + '" label="' + specItem.label + '"></customfilefield>';
					if (specItem.display_label == '0') {
						content += '</span>';
					}
					if (inlineFields.indexOf(specItem.spec)) {
						content += '</span>';

					}
				}
			}
			content += '</fieldset>';
		}
		return content;
	}

	(function() {
		// Primary drawing function
		hasLogoSelection = false;
		$contentContainer = $('#mainContentContainer');
		$contentContainer.append(textFormMarkup);
		$('#specFormContent').append(renderSpecFormContent());
		$('#specFormContent').append('<div style="margin: 50px; width: 100%; height: 30px; text-align: center;"><button style="box-shadow: 0px 0px 9px 0px #00ac00;" id="secondaryPreviewBtn" class="btn btn-default btn-sfp">Preview first to proceed</button></div>');
		try {
			var variantInfo = JSON.parse(localStorage.getItem(angScope.Variant.InteropID));
		} catch (whocares) {}
		if (variantInfo && variantInfo.facility) {
			$('#logo').val(variantInfo.facility);
		}
		if (hasLogoSelection) {
			let select2 = $('#logo').select2({width: '100%'});
			select2.data('select2').$selection.css('height', '40px');
		}
		compileAngularDirectives(['specformpreview', 'octextfield', 'customfilefield', 'customselectionfield']);
		$(document).off('click', '#secondaryPreviewBtn');
		$(document).on('click', '#secondaryPreviewBtn', function() {
			$('#previewBtn').click();
			if (hasLogoSelection && !$('#logo').val()) {
				return;
			}
			$(document).scrollTop(0);
		});
		$(document).off('change', '#logo');
		$(document).on('change', '#logo', function() {
			if (typeof angScope.Variant.InteropID !== 'undefined') {
				localStorage.setItem(angScope.Variant.InteropID, JSON.stringify({'facility': $(this).val()}));
			}
			// Autofill fields
			var $logoValue = $(this).val(); // Pre-cache selector
			// Primary Logo:
			if (typeof angScope.Variant.Specs.Logo_Style !== 'undefined' && angScope.Variant.Specs.Logo_Style.Value == 'Black') {
				// Black primary logo
				if (typeof angScope.Variant.Specs.LogoFileName !== 'undefined') {
					angScope.Variant.Specs.LogoFileName.Value = facLogoBlackSpecOptions[$logoValue];
				}
				if (typeof angScope.Variant.Specs.Logo !== 'undefined') {
					angScope.Variant.Specs.Logo.Value = facLogoBlackSpecOptions[$logoValue];
				}
				if (typeof angScope.Variant.Specs.SelectedLogo !== 'undefined') {
					angScope.Variant.Specs.SelectedLogo.Value = facLogoBlackSpecOptions[$logoValue];
				}
				if (typeof angScope.Variant.Specs.SelectedLogo_2 !== 'undefined') {
					angScope.Variant.Specs.SelectedLogo_2.Value = facLogoBlackSpecOptions[$logoValue];
				}
			} else if (typeof angScope.Variant.Specs.Logo_Style !== 'undefined' && angScope.Variant.Specs.Logo_Style.Value == 'White') {
				// White primary logo
				if (typeof angScope.Variant.Specs.LogoFileName !== 'undefined') {
					angScope.Variant.Specs.LogoFileName.Value = facLogoWhiteSpecOptions[$logoValue];
				}
				if (typeof angScope.Variant.Specs.Logo !== 'undefined') {
					angScope.Variant.Specs.Logo.Value = facLogoWhiteSpecOptions[$logoValue];
				}
				if (typeof angScope.Variant.Specs.SelectedLogo !== 'undefined') {
					angScope.Variant.Specs.SelectedLogo.Value = facLogoWhiteSpecOptions[$logoValue];
				}
				if (typeof angScope.Variant.Specs.SelectedLogo_2 !== 'undefined') {
					angScope.Variant.Specs.SelectedLogo_2.Value = facLogoWhiteSpecOptions[$logoValue];
				}
			} else if (typeof angScope.Variant.Specs.Logo_Style !== 'undefined' && angScope.Variant.Specs.Logo_Style.Value == 'TwoColor') {
				angScope.Variant.Specs.LogoFileName.Value = facLogoTwoColorSpecOptions[$logoValue];
			} else if (typeof angScope.Variant.Specs.Logo_Style !== 'undefined' && angScope.Variant.Specs.Logo_Style.Value == 'BusinessCardLogo') {
				angScope.Variant.Specs.LogoFileName.Value = facLogoBusinessCardSpecOptions[$logoValue];
			} else if (typeof angScope.Variant.Specs.Logo_Style !== 'undefined' && angScope.Variant.Specs.Logo_Style.Value == 'ColorAndBlack') {
				angScope.Variant.Specs.LogoFileName.Value = facLogoSpecOptions[$logoValue];
				angScope.Variant.Specs.LogoFileName_2.Value = facLogoBlackSpecOptions[$logoValue];
			} else {
				// Color primary logo
				if (typeof angScope.Variant.Specs.LogoFileName !== 'undefined') {
					angScope.Variant.Specs.LogoFileName.Value = facLogoSpecOptions[$logoValue];
				}
				if (typeof angScope.Variant.Specs.Logo !== 'undefined') {
					angScope.Variant.Specs.Logo.Value = facLogoSpecOptions[$logoValue];
				}
				if (typeof angScope.Variant.Specs.SelectedLogo !== 'undefined') {
					angScope.Variant.Specs.SelectedLogo.Value = facLogoSpecOptions[$logoValue];
				}
				if (typeof angScope.Variant.Specs.SelectedLogo_2 !== 'undefined') {
					angScope.Variant.Specs.SelectedLogo_2.Value = facLogoSpecOptions[$logoValue];
				}
			}
			if (typeof angScope.Variant.Specs.LogoSelection !== 'undefined') {
				angScope.Variant.Specs.LogoSelection.Value = $logoValue;
			}
			// Secondary Logo:
			if (typeof angScope.Variant.Specs.LogoFileName_2 !== 'undefined') {
				if (typeof angScope.Variant.Specs.Logo_Style !== 'undefined' && angScope.Variant.Specs.Logo_Style.Value == 'ColorAndWhite') {
					// ColorAndWhite
					angScope.Variant.Specs.LogoFileName_2.Value = facLogoWhiteSpecOptions[$logoValue];

				} else if (typeof angScope.Variant.Specs.Logo_Style !== 'undefined' && angScope.Variant.Specs.Logo_Style.Value == 'ColorAndColor') {
					// ColorAndColor
					angScope.Variant.Specs.LogoFileName_2.Value = facLogoSpecOptions[$logoValue];
				} else {
					// Default 2nd logo to white -- should not happen
					angScope.Variant.Specs.LogoFileName_2.Value = facLogoWhiteSpecOptions[$logoValue];
				}
			}
			if (typeof angScope.Variant.Specs.LogoFileName02 !== 'undefined') {
				angScope.Variant.Specs.LogoFileName02.Value = facLogoWhiteSpecOptions[$logoValue];
			}
			if (typeof angScope.Variant.Specs.LogoState !== 'undefined') {
				angScope.Variant.Specs.LogoState.Value = stateSpecOptions[$logoValue];
			}
			if (typeof angScope.Variant.Specs.LogoUsed !== 'undefined') {
				angScope.Variant.Specs.LogoUsed.Value = logoUsedSpecOptions[$logoValue];
			}
			// Legal Blurb / POLAS
			if (typeof angScope.Variant.Specs.Legal_Blurb !== 'undefined' && typeof angScope.Variant.Specs.Polas_Type !== 'undefined') {
				if (angScope.Variant.Specs.Polas_Type.Value == 'Lrg') {
					angScope.Variant.Specs.Legal_Blurb.Value = polasBlurbLrgSpecOptions[$logoValue];
				}
				if (angScope.Variant.Specs.Polas_Type.Value == 'SmHor') {
					angScope.Variant.Specs.Legal_Blurb.Value = polasBlurbSmHorSpecOptions[$logoValue];
				}
				if (angScope.Variant.Specs.Polas_Type.Value == 'SmVert') {
					angScope.Variant.Specs.Legal_Blurb.Value = polasBlurbSmVertSpecOptions[$logoValue];
				}
			}
			// Web address
			if (typeof webSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[webSpec] !== undefined) {
				angScope.Variant.Specs[webSpec].Value = webSpecOptions[$logoValue];
				$('octextfield[label="Web Address"] input').val(webSpecOptions[$logoValue]);
			}
			// Facility Name
			if (typeof facilityNameSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[facilityNameSpec] !== undefined) {
				angScope.Variant.Specs[facilityNameSpec].Value = facilityNameSpecOptions[$logoValue];
				$('octextfield[label="Facility Name"] input').val(facilityNameSpecOptions[$logoValue]);
			}
			// Address
			if (typeof addressSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[address1Spec] !== undefined) {
				angScope.Variant.Specs[address1Spec].Value = addressSpecOptions[$logoValue];
				$('octextfield[label="Address 1"] input').val(addressSpecOptions[$logoValue]);
			}
			if (typeof citySpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[citySpec] !== undefined) {
				angScope.Variant.Specs[citySpec].Value = citySpecOptions[$logoValue];
				$('octextfield[label="City"] input').val(citySpecOptions[$logoValue]);
			}
			if (typeof stateSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[stateSpec] !== undefined) {
				angScope.Variant.Specs[stateSpec].Value = stateSpecOptions[$logoValue];
				$('#state').val(stateSpecOptions[$logoValue]);
				// TTY requires a state to be present
				if (typeof tddSpecOptions[$('#state').val()] !== 'undefined' && angScope.Variant.Specs[ttySpec] !== undefined) {
					angScope.Variant.Specs[ttySpec].Value = tddSpecOptions[$('#state').val()];
					$('octextfield[label="TTY"] input').val(tddSpecOptions[$('#state').val()]);
				}
				// TTY State Abbrev
				if (angScope.Variant.Specs[ttyAbbrSpec] !== undefined) {
					for (var i in statesData) {
						if (statesData[i] == $('#state').val()) {
							angScope.Variant.Specs[ttyAbbrSpec].Value = i;
							$('octextfield[label="ABBR"] input').val(i);
						}
					}
				}
			}
			// Primary city -- Used for one-off product K-1900627-V
			if (typeof citySpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs.Primary_city !== undefined) {
				angScope.Variant.Specs.Primary_city.Value = citySpecOptions[$logoValue];
				$('octextfield[label="Primary City"] input').val(citySpecOptions[$logoValue]);
			}
			if (typeof zipSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[zipcodeSpec] !== undefined) {
				angScope.Variant.Specs[zipcodeSpec].Value = zipSpecOptions[$logoValue];
				$('octextfield[label="Zip Code"] input').val(zipSpecOptions[$logoValue]);
			}
			// Phone
			if (typeof phoneACSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[phoneAcSpec] !== undefined) {
				angScope.Variant.Specs[phoneAcSpec].Value = phoneACSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.' + phoneAcSpec + '"] input').val(phoneACSpecOptions[$logoValue]);
			}
			if (typeof phoneEXSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[phonePrefixSpec] !== undefined) {
				angScope.Variant.Specs[phonePrefixSpec].Value = phoneEXSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.' + phonePrefixSpec + '"] input').val(phoneEXSpecOptions[$logoValue]);
			}
			if (typeof phoneNUMSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[phoneNumberSpec] !== undefined) {
				angScope.Variant.Specs[phoneNumberSpec].Value = phoneNUMSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.' + phoneNumberSpec + '"] input').val(phoneNUMSpecOptions[$logoValue]);
			}
			// Primary phone -- Used for one-off product K-1900627-V
			if (typeof phoneACSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs.PhoneAC_01 !== undefined) {
				angScope.Variant.Specs.PhoneAC_01.Value = phoneACSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.PhoneAC_01"] input').val(phoneACSpecOptions[$logoValue]);
			}
			if (typeof phoneEXSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs.PhoneEX_01 !== undefined) {
				angScope.Variant.Specs.PhoneEX_01.Value = phoneEXSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.PhoneEX_01"] input').val(phoneEXSpecOptions[$logoValue]);
			}
			if (typeof phoneNUMSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs.PhoneNUM_01 !== undefined) {
				angScope.Variant.Specs.PhoneNUM_01.Value = phoneNUMSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.PhoneNUM_01"] input').val(phoneNUMSpecOptions[$logoValue]);
			}
			// Fax
			if (typeof faxACSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[faxAcSpec] !== undefined) {
				angScope.Variant.Specs[faxAcSpec].Value = faxACSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.' + faxAcSpec + '"] input').val(faxACSpecOptions[$logoValue]);
			}
			if (typeof faxEXSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[faxPrefixSpec] !== undefined) {
				angScope.Variant.Specs[faxPrefixSpec].Value = faxEXSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.' + faxPrefixSpec + '"] input').val(faxEXSpecOptions[$logoValue]);
			}
			if (typeof faxNUMSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[faxNumberSpec] !== undefined) {
				angScope.Variant.Specs[faxNumberSpec].Value = faxNUMSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.' + faxNumberSpec + '"] input').val(faxNUMSpecOptions[$logoValue]);
			}
			// Toll Free
			if (typeof tollFreeACSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[tollFreeAcSpec] !== undefined) {
				angScope.Variant.Specs[tollFreeAcSpec].Value = tollFreeACSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.' + tollFreeAcSpec + '"] input').val(tollFreeACSpecOptions[$logoValue]);
			}
			if (typeof tollFreeEXSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[tollFreePrefixSpec] !== undefined) {
				angScope.Variant.Specs[tollFreePrefixSpec].Value = tollFreeEXSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.' + tollFreePrefixSpec + '"] input').val(tollFreeEXSpecOptions[$logoValue]);
			}
			if (typeof tollFreeNUMSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[tollFreeNumberSpec] !== undefined) {
				angScope.Variant.Specs[tollFreeNumberSpec].Value = tollFreeNUMSpecOptions[$logoValue];
				$('octextfield[customfield="Variant.Specs.' + tollFreeNumberSpec + '"] input').val(tollFreeNUMSpecOptions[$logoValue]);
			}
			// HHA
			if (typeof HHASpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[hhaSpec] !== undefined) {
				angScope.Variant.Specs[hhaSpec].Value = HHASpecOptions[$logoValue];
				$('octextfield[label="HHA"] input').val(HHASpecOptions[$logoValue]);
			}
			// Central Intake
			if (typeof IntakeNUMSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[intakeNumSpec] !== undefined) {
				angScope.Variant.Specs[intakeNumSpec].Value = IntakeNUMSpecOptions[$logoValue];
				$('octextfield[label="Central Intake"] input').val(IntakeNUMSpecOptions[$logoValue]);
			}
			// Legacy Name
			if (typeof FormerNameSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[formerNameSpec] !== undefined) {
				angScope.Variant.Specs[formerNameSpec].Value = FormerNameSpecOptions[$logoValue];
				$('octextfield[label="Legacy Name"] input').val(FormerNameSpecOptions[$logoValue]);
			}
			// QIO
			if (typeof qioPhoneSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs['QIO_Phone'] !== undefined) {
				angScope.Variant.Specs['QIO_Phone'].Value = qioPhoneSpecOptions[$logoValue];
				$('octextfield[label="QIO Phone"] input').val(qioPhoneSpecOptions[$logoValue]);
			}
			if (typeof qioTtySpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs['QIO_TTY'] !== undefined) {
				angScope.Variant.Specs['QIO_TTY'].Value = qioTtySpecOptions[$logoValue];
				$('octextfield[label="TTY"] input').val(qioTtySpecOptions[$logoValue]);
			}
			if (typeof qioNameSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs['QIO_Name'] !== undefined) {
				angScope.Variant.Specs['QIO_Name'].Value = qioNameSpecOptions[$logoValue];
				$('octextfield[label="QIO Name"] input').val(qioNameSpecOptions[$logoValue]);
			}
			// Vet Logo
			if (typeof vetStarLogoSpecOptions[$logoValue] !== 'undefined' && angScope.Variant.Specs[vetLogoSpec] !== undefined) {
				angScope.Variant.Specs[vetLogoSpec].Value = vetStarLogoSpecOptions[$logoValue];
			}
		});
		$(document).off('change', '#state');
		$(document).on('change', '#state', function() {
			var stateAbbrev = Object.keys(statesData)[Object.values(statesData).indexOf($('#state').val())] // :D
			angScope.Variant.Specs.State.Value = stateAbbrev;
		});
		if (typeof angScope.Variant.Specs.POLAS_Orient !== 'undefined' && typeof angScope.Variant.Specs.POLAS_Size !== 'undefined' ) {
			// Some products have this method for POLAS variations
			$(document).off('change', '#state');
			$(document).on('change', '#state', function() {
				var orientation = angScope.Variant.Specs.POLAS_Orient.Value;
				var size = angScope.Variant.Specs.POLAS_Size.Value;
				var stateAbbrev = Object.keys(statesData)[Object.values(statesData).indexOf($('#state').val())] // :D
				var polasFilename = 'POLAS_' + stateAbbrev + '_' + size + '_' + orientation + '.eps';
				angScope.Variant.Specs.Legal_Blurb.Value = polasFilename;
				angScope.Variant.Specs.State.Value = $(this).val();
			});
		}
		$(document).off('click', '#proceedToCheckout');
		$(document).on('click', '#proceedToCheckout', function() {
			if (hasLogoSelection && !$('#logo').val()) {
				alert('You must choose a facility / division logo before proceeding.');
				return;
			}
			if (angScope.editingVariant) {
				angScope.saveVariantEdit();
			} else {
				angScope.saveasnew(true);
			}
		});
	})();
}
