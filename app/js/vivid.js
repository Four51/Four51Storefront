var angScope;
var angOrder;
var formParams;
var statesData = {"AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District Of Columbia", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"};

function compileAngularDirectives(fields) {
	// Since we're injecting raw code into the dom, any custom angular fields need to be told to render:
	for (i = 0; i < fields.length; i++) {
		angCompile(fields[i])(angScope);
	}
}
$(document).on('click', '#needHelp', function() {
	var needHelpMarkup = '\
		<div class="panel" id="needHelpModalContainer" style="overflow: hidden; padding: 0px; position: fixed; top: 10%; left: 0px; right: 0px; width: 450px; height: auto; margin: 0 auto; border-left: 1px solid #000; border-right: 1px solid #000; background-color: #fff; z-index: 99999; box-shadow: 0px 0px 20px 1px #000;">\
			<div class="panel-heading" style="background-color: #f5f5f5">\
				<h3 class="panel-title" style="background-color: #f5f5f5">Customer Support</h3>\
			</div>\
			<div class="panel-body">\
				<div style="user-select: none; float: right; cursor: pointer; height: 20px; position: relative; background-color: #fff;" id="closeNeedHelp"><strong>CLOSE</strong></div>\
				<br><br>\
				<strong>Having problems? We\'re here to help!</strong><br>\
				If you have questions about an order or general site related questions, contact us at:<br><br>\
				<div style="padding: 10px; margin-top: 10px; border: 1px solid #d8d8d8; border-radius: 3px; background: #f6f6f6;">\
					Customer Support<br>\
					Vivid Impact<br>\
					10116 Bunsen Way<br>\
					Louisville, KY 40299<br>\
					United States<br>\
					502-495-6900<br>\
					orders@vividimpact.com<br>\
				</div>\
			</div>\
		</div>'
	$('body').append(needHelpMarkup);
});
$(document).on('click', '#closeNeedHelp', function() {
	$('#needHelpModalContainer').remove();
});
