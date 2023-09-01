var hasLogoSelection = false;
var lpMasterFile = 'LP_AcuteHosp_MarketMstr';

function getMasterFileNameSpace() {
	try {
		return angScope.Product.StaticSpecGroups['01-MasterFile'].Specs.JsonUsed.Value;
	} catch (err) {
		return '';
	}
}

function getMasterFileVariable(variableName) {
	var namespace = getMasterFileNameSpace();

	if (namespace.length > 0) {
		return window[namespace][variableName];
	} else {
		return window[variableName];
	}
}

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

	function isHidden(labelText) {
		if (labelText) {
			var parts = labelText.split('|');

			if (parts.length === 2 && parts[1] === 'hidden') {
				return 'hide';
			}
		}

		return '';
	}

	function isReadonly(labelText) {
		if (labelText) {
			var parts = labelText.split('|');

			if (parts.length === 2 && parts[1] === 'readonly') {
				return 'true';
			}
		}

		return 'false';
	}

	function specLabel(labelText) {
		if (labelText) {
			var parts = labelText.split('|');

			if (parts.length > 0) return parts[0];
		}

		return '';
	}

	function updateFacilityChoices(namespace) {
		let options = '';
		let systemNamespace = window[lpMasterFile].facilityOptions[namespace];
		let logoOptions = window[systemNamespace].logoOptions;
		let logo = $('#logo');

		logo.empty();

		logo.append('<option value="" selected disabled>Make a selection...</option>');

		for (let lo in logoOptions) {
			logo.append('<option value="' + logoOptions[lo] + '">' + logoOptions[lo] + '</option>');
		}

		logo.data('namespace', systemNamespace);
	}

	function renderSpecFormContent() {
		// Prepare spec data
		var content = '<div class="logo-selection-options">';
		var masterFile = getMasterFileNameSpace();
		var logoOptions = getMasterFileVariable('logoOptions');

		if (masterFile === lpMasterFile) {
			hasLogoSelection = true;

			//this is a lifepoint masterfile product, need to show an additional select for the healthcare system then show facility options after healthcare system is selected
			var masterOptions = '';
			for (var lo in logoOptions) {
				masterOptions += '<option value="' + logoOptions[lo] + '">' + logoOptions[lo] + '</option>';
			}

			content = '<div style="font-size: 11px; margin-bottom: 25px;"><label for="logo">Choose Healthcare System</label><select id="master" class="form-control nopad" required><option value="" selected disabled>Make a selection...</option>' + masterOptions + '</select></div>';

			content += '<div class="logo-selection-options" style="display: none;">';

			logoOptions = [];
		}

		for (var y in angScope.Product.Specs) {
			if (y === 'LogoSelection') {
				hasLogoSelection = true;
				var options = '';
				for (var z in logoOptions) {
					options += '<option value="' + logoOptions[z] + '">' + logoOptions[z] + '</option>';
				}
				content += '<div style="font-size: 11px; margin-bottom: 25px;"><label for="logo">Choose Facility</label><select data-namespace="' + masterFile + '" id="logo" class="form-control nopad" required><option value="" selected disabled>Make a selection...</option>' + options + '</select></div>';
			} else {
				var spec = angScope.Product.Specs[y];

				if (spec.CanSetForLineItem !== true) {
					if (spec.Name.startsWith('v99')) {
						//special case spec for group names
						content += '<div style="margin-top: 10px; font-weight: bold;"><label>' + spec.Label + '</label><hr style="border-bottom: 1px solid #333333" /></div>';
					}
					else {
						var labelText = spec.Label;

						//the initial label value may contain additional meta data to hide or make readonly so we need to strip that info out
						spec.Label = specLabel(labelText);

						switch (spec.ControlType) {
							case 'Text':
								content += '<octextfield readonly="' + isReadonly(labelText) + '" class="nopad ' + isHidden(labelText) + '" customfield="Variant.Specs.' + spec.Name + '" label="' + spec.Label + '"></octextfield>';
								break;

							case 'Selection':
								content += '<ocselectionfield class="nopad" customfield="Variant.Specs.' + spec.Name + '" label="' + spec.Label + '"></ocselectionfield>';
								break;

							case 'File':
								content += '<ocfilefield class="nopad" customfield="Variant.Specs.' + spec.Name + '" label="' + spec.Label + '"></ocfilefield>';
								break;
						}
					}
				}
			}
		}

		content += '</div>';

		return content;
	}

	(function() {
		// Primary drawing function
		hasLogoSelection = false;

		$('#mainContentContainer').append(textFormMarkup);

		$('#specFormContent').append(renderSpecFormContent());

		if (hasLogoSelection) {
			let select2 = $('#logo').select2({width: '100%'});
			let masterSelect2 = $('#master').select2({width: '100%'});

			if (select2.length > 0)	select2.data('select2').$selection.css('height', '40px');
			if (masterSelect2.length > 0)	masterSelect2.data('select2').$selection.css('height', '40px');
		}

		compileAngularDirectives(['specformpreview', 'octextfield', 'customfilefield', 'customselectionfield', 'ocfilefield', 'ocselectionfield']);

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
			var $logoValue = $(this).val(); // Pre-cache selector

			for (var y in angScope.Product.Specs) {
				var spec = angScope.Product.Specs[y];
				var varspec = angScope.Variant.Specs[y];

				//loop through each spec and try to update its value if that var name is listed in the XXmaster.js file
				//need to update the Product.Spec and the Variant.Spec, however, dont understand why
				if (spec.Name !== 'LogoSelection' && spec.Name.startsWith('v99') === false) {
					var specVarName = y + 'SpecOptions';
					var masterfileVar = window[$(this).data('namespace')][specVarName];

					if (masterfileVar !== undefined && masterfileVar[$logoValue] !== undefined) {
						spec.Value = masterfileVar[$logoValue];
						if (varspec !== undefined) varspec.Value = masterfileVar[$logoValue];
					}
				}
			}

			angScope.$digest();
		});

		$(document).on('change', '#master', function() {
			//need to build the standard spec form like we do today, but it will need to be wiped and reset each time this value changes
			$('div.logo-selection-options input').val('');

			//need to update the possible options for the facility drop down
			updateFacilityChoices($(this).val());

			$('div.logo-selection-options').show();
		});

		$(document).off('click', '#proceedToCheckout');

		$(document).on('click', '#proceedToCheckout', function() {
			if (hasLogoSelection && (!$('#logo').val() || !$('#master').val())) {
				alert('You must choose a facility / division logo before proceeding.');
				return;
			}

			angScope.saveasnew(true);
		});
	})();
}
