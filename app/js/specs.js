// IMPORTANT NOTE: If you change the label on any fields that are auto-filled, you will break auto-fill unless corresponding changes are also made to templates/drawform_textbased.js

var specs = [
	{
		"spec": "Address1",
		"group": "Contact",
		"label": "Address 1",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Admin_AC",
		"group": "Administrator Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "BC_Phone_AC",
		"group": "Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "CampPhoneAC",
		"group": "Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "CellAC",
		"group": "Cell Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "CM_AC",
		"group": "Clinical Manager Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "FaxAC",
		"group": "Fax Number",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Info_PhoneAC",
		"group": "Info Phone Number",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "New_FaxAC",
		"group": "Fax",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "New_PhoneAC",
		"group": "Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone_AC",
		"group": "Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone02_AC",
		"group": "Phone 2",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone1AC",
		"group": "Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone2AC",
		"group": "Phone 2",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone3AC",
		"group": "Phone 3",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone4AC",
		"group": "Phone 4",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneAC",
		"group": "Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneTF_AC",
		"group": "Toll Free",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Refer_PhoneAC",
		"group": "Referral Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneAC_01",
		"group": "Primary Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneEX_01",
		"group": "Primary Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneNUM_01",
		"group": "Primary Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneAC_02",
		"group": "Secondary Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneEX_02",
		"group": "Secondary Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneNUM_02",
		"group": "Secondary Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "StreetAddress",
		"group": "Contact",
		"label": "Address 1",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "TF_FaxAC",
		"group": "Toll Free Fax",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TF_PhoneAC",
		"group": "Toll Free",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TFPhoneAC",
		"group": "Toll Free",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TollFreeAC",
		"group": "Toll Free",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TollFreeFaxAC",
		"group": "Toll Free Fax",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "v03_Central_Intake_AC",
		"group": "Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V04StreetAddress",
		"group": "Contact",
		"label": "Address 1",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "v06_Place_Address1",
		"group": "Contact",
		"label": "Address 1",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V09Phone1AC",
		"group": "Phone",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V10Phone2AC",
		"group": "Phone 2",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V11Phone3AC",
		"group": "Phone 3",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V11Phone4AC",
		"group": "Phone 4",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V11Phone5AC",
		"group": "Phone 5",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Z_FaxAC_2",
		"group": "Fax 2",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Z_PhoneAC_2",
		"group": "Phone 2",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Address2",
		"group": "Contact",
		"label": "Address 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Admin_EX",
		"group": "Administrator Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "BC_Phone_EX",
		"group": "Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "CampPhoneEX",
		"group": "Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "CellEX",
		"group": "Cell Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "CM_EX",
		"group": "Clinical Manager Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "ContactPerson_EX",
		"group": "Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "FaxEX",
		"group": "Fax Number",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Info_PhoneEX",
		"group": "Info Phone Number",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "New_FaxEX",
		"group": "Fax",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "New_PhoneEX",
		"group": "Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone_EX",
		"group": "Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone02_EX",
		"group": "Phone 2",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone1EX",
		"group": "Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone1Exch",
		"group": "Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone2EX",
		"group": "Phone 2",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone2Exch",
		"group": "Phone 2",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone3EX",
		"group": "Phone 3",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone3Exch",
		"group": "Phone 3",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone4EX",
		"group": "Phone 4",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone4Exch",
		"group": "Phone 4",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneEX",
		"group": "Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneTF_EX",
		"group": "Toll Free",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Refer_PhoneEX",
		"group": "Referral Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "StreetAddress2",
		"group": "Contact",
		"label": "Address 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "TF_FaxEx",
		"group": "Toll Free Fax",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TF_PhoneEX",
		"group": "Toll Free",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TFPhoneEX",
		"group": "Toll Free",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TollFreeEX",
		"group": "Toll Free",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TollFreeFaxEX",
		"group": "Toll Free Fax",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "v03_Central_Intake_EX",
		"group": "Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V05AddressLine2",
		"group": "Contact",
		"label": "Address 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "v07_Place_Address2",
		"group": "Contact",
		"label": "Address 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V09Phone1EX",
		"group": "Phone",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V10Phone2EX",
		"group": "Phone 2",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V11Phone3EX",
		"group": "Phone 3",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V11Phone4EX",
		"group": "Phone 4",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V11Phone5EX",
		"group": "Phone 5",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Z_FaxEX_2",
		"group": "Fax 2",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Z_PhoneEX_2",
		"group": "Phone 2",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Z_StreetAddress_2",
		"group": "Contact",
		"label": "Address 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Admin_NUM",
		"group": "Administrator Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "BC_Phone_NUM",
		"group": "Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Camp_City",
		"group": "Contact",
		"label": "City",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Primary_city",
		"group": "Contact",
		"label": "Primary City",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Secondary_city",
		"group": "Contact",
		"label": "Secondary City",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "CampPhoneNUM",
		"group": "Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "CellNUM",
		"group": "Cell Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "City",
		"group": "Contact",
		"label": "City",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "CM_NUM",
		"group": "Clinical Manager Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "FaxNUM",
		"group": "Fax Number",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Info_PhoneNUM",
		"group": "Info Phone Number",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "MS_City",
		"group": "Contact",
		"label": "City",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "New_FaxNUM",
		"group": "Fax",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "New_PhoneNUM",
		"group": "Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone_NUM",
		"group": "Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone02_NUM",
		"group": "Phone 2",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone1NUM",
		"group": "Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone1Numb",
		"group": "Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone2NUM",
		"group": "Phone 2",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone2Numb",
		"group": "Phone 2",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone3NUM",
		"group": "Phone 3",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone3Numb",
		"group": "Phone 3",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone4NUM",
		"group": "Phone 4",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Phone4Numb",
		"group": "Phone 4",
		"label": "Number",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "PhoneNUM",
		"group": "Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PhoneTF_NUM",
		"group": "Toll Free",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Refer_PhoneNUM",
		"group": "Referral Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TF_FaxNum",
		"group": "Toll Free Fax",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TF_PhoneNUM",
		"group": "Toll Free",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TFPhoneNUM",
		"group": "Toll Free",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TollFreeFaxNUM",
		"group": "Toll FreeFax",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "TollFreeNUM",
		"group": "Toll Free",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "v03_Central_Intake_NUM",
		"group": "Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V06City",
		"group": "Contact",
		"label": "City",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V09Phone1NUM",
		"group": "Phone",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V10Phone2NUM",
		"group": "Phone 2",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V11Phone3NUM",
		"group": "Phone 3",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V11Phone4NUM",
		"group": "Phone 4",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "V11Phone5NUM",
		"group": "Phone 5",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Z_FaxNum_2",
		"group": "Fax 2",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Z_PhoneNum_2",
		"group": "Phone 2",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Camp_State",
		"group": "Contact",
		"label": "State",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "MS_State",
		"group": "Contact",
		"label": "State",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "State",
		"group": "Contact",
		"label": "State",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V07State",
		"group": "Contact",
		"label": "State",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "State1",
		"group": "Contact",
		"label": "State 1",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "State2",
		"group": "Contact",
		"label": "State 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Z_State_2",
		"group": "Contact",
		"label": "State 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Camp_Zip",
		"group": "Contact",
		"label": "Zip Code",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V08ZipCode",
		"group": "Contact",
		"label": "Zip Code",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Zip",
		"group": "Contact",
		"label": "Zip Code",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "ZipCode",
		"group": "Contact",
		"label": "Zip Code",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "ZipCode1",
		"group": "Contact",
		"label": "Zip Code 1",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Z_ZipCode_2",
		"group": "Contact",
		"label": "Zip Code 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "ZipCode2",
		"group": "Contact",
		"label": "Zip Code 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "a_Name",
		"group": "Contact",
		"label": "Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "a_Title",
		"group": "Contact",
		"label": "Title",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Extra_Logo01",
		"group": "Personalization",
		"label": "Achievement - Front",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Extra_Logo02",
		"group": "Personalization",
		"label": "Achievement - Back",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Extra_Logo03",
		"group": "Personalization",
		"label": "Achievement - Back",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Extra_Logo04",
		"group": "Personalization",
		"label": "Achievement - Back",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Achievement",
		"group": "Personalization",
		"label": "Achievement",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "ACOName",
		"group": "Contact",
		"label": "ACO Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Admin_Firstname",
		"group": "Administrator Info",
		"label": "Admin Firstname",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Admin_Lastname",
		"group": "Administrator Info",
		"label": "Admin Lastname",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Affiliate_Name",
		"group": "Personalization",
		"label": "Affiliate Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "AffiliateName",
		"group": "Personalization",
		"label": "Affiliate Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Age_Group",
		"group": "Personalization",
		"label": "Age Group",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "AM_PM_01",
		"group": "Personalization",
		"label": "AM PM 1",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "AM_PM_02",
		"group": "Personalization",
		"label": "AM PM 2",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "AMPM",
		"group": "Personalization",
		"label": "AM PM",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "AMPM2",
		"group": "Personalization",
		"label": "AM PM 2",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Area",
		"group": "Personalization",
		"label": "Area",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "B_Date",
		"group": "Personalization",
		"label": "Date",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "B_Time",
		"group": "Personalization",
		"label": "Time",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "BakerChoice",
		"group": "Personalization",
		"label": "Baker Choice",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "BakerChoice_Bold",
		"group": "Personalization",
		"label": "Baker Choice Bold",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "BC_Address",
		"group": "Contact",
		"label": "Address",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "BC_Name",
		"group": "Contact",
		"label": "Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Bio",
		"group": "Personalization",
		"label": "Biography",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Biography",
		"group": "Personalization",
		"label": "Biography",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Bkgd_Choice",
		"group": "Personalization",
		"label": "Background Choice",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "BranchName",
		"group": "Contact",
		"label": "Branch Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Camp_Address",
		"group": "Contact",
		"label": "Address",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Camp_Name",
		"group": "Contact",
		"label": "Camp Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "CampDate",
		"group": "Personalization",
		"label": "Date",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "CampEmail",
		"group": "Contact",
		"label": "Email",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "CampLocation",
		"group": "Contact",
		"label": "Camp Location",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "CellTYPE",
		"group": "Cell Phone",
		"label": "Cell Type",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Certificate1",
		"group": "Personalization",
		"label": "Certificate One",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Certificate2",
		"group": "Personalization",
		"label": "Certificate Two",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Certificate3",
		"group": "Personalization",
		"label": "Certificate Three",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Champion_Name",
		"group": "Personalization",
		"label": "Champion Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Choice",
		"group": "Personalization",
		"label": "Choice",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "City1",
		"group": "Contact",
		"label": "City One",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "City2",
		"group": "Contact",
		"label": "City Two",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "CM_Firstname",
		"group": "Clinical Manager Info",
		"label": "First Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "CM_Lastname",
		"group": "Clinical Manager Info",
		"label": "Last Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Color",
		"group": "Personalization",
		"label": "Color",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Company_Name",
		"group": "Contact",
		"label": "Company Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Contact",
		"group": "Contact",
		"label": "Contact Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Contact_Email",
		"group": "Contact",
		"label": "Contact Email",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Contact_Name",
		"group": "Contact",
		"label": "Contact Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "ContactName",
		"group": "Contact",
		"label": "Contact Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "ContactPerson",
		"group": "Contact",
		"label": "Contact Person",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Costperday",
		"group": "Personalization",
		"label": "Cost Per Day",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Costpermonth",
		"group": "Personalization",
		"label": "Cost Per Month",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Credentials",
		"group": "Contact",
		"label": "Credentials",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "CustomMessage",
		"group": "Personalization",
		"label": "Custom Message",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Daily_Rate",
		"group": "Personalization",
		"label": "Daily Rate",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Date",
		"group": "Personalization",
		"label": "Date",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Date_Day",
		"group": "Personalization",
		"label": "Date Day",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Date_DD",
		"group": "Personalization",
		"label": "Date Day",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Date_MM",
		"group": "Personalization",
		"label": "Date Month",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Date_Month",
		"group": "Personalization",
		"label": "Date Month",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Date_Time",
		"group": "Personalization",
		"label": "Date Time",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Date_Time_AMPM",
		"group": "Personalization",
		"label": "Date Time AM\/PM",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Date_Time_Hour",
		"group": "Personalization",
		"label": "Date Time Hour",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Date_Time_Minutes",
		"group": "Personalization",
		"label": "Date Time Minutes",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Date_Year",
		"group": "Personalization",
		"label": "Date Year",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Date_YY",
		"group": "Personalization",
		"label": "Date Year",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Day",
		"group": "Personalization",
		"label": "Day",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Day_01Start",
		"group": "Personalization",
		"label": "Start Day",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Day_02End",
		"group": "Personalization",
		"label": "End Day",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Day_or_Weekend",
		"group": "Personalization",
		"label": "Day or Weekend",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Days",
		"group": "Personalization",
		"label": "Days",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Detail",
		"group": "Personalization",
		"label": "Detail",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "DivisionName",
		"group": "Personalization",
		"label": "Division Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "DT01_DayofWeek",
		"group": "Personalization",
		"label": "Day of Week",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "DT02_Month",
		"group": "Personalization",
		"label": "Month",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "DT03_Date",
		"group": "Personalization",
		"label": "Day",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "DT04_Year",
		"group": "Personalization",
		"label": "Year",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "DT05_StartTime",
		"group": "Personalization",
		"label": "Start Time",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "DT06_EndTime",
		"group": "Personalization",
		"label": "End Time",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "DT07_Startampm",
		"group": "Personalization",
		"label": "Start AM\/PM",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "DT08_Endampm",
		"group": "Personalization",
		"label": "End AM\/PM",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Email",
		"group": "Contact",
		"label": "Email",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "EmailAddr",
		"group": "Contact",
		"label": "Email Address",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "EmailAddress",
		"group": "Contact",
		"label": "Email Address",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "End_AM_PM",
		"group": "Personalization",
		"label": "End AM\/PM",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "End_Day",
		"group": "Personalization",
		"label": "End Day",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "End_Month",
		"group": "Personalization",
		"label": "End Month",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "End_Time",
		"group": "Personalization",
		"label": "End Time",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "End_Year",
		"group": "Personalization",
		"label": "End Year",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "EndTime",
		"group": "Personalization",
		"label": "End Time",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "EventInformation",
		"group": "Personalization",
		"label": "Event Information",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Extension",
		"group": "Phone",
		"label": "Ext",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Facility",
		"group": "Contact",
		"label": "Facility",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Facility_Name",
		"group": "Contact",
		"label": "Facility Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "FacilityName",
		"group": "Contact",
		"label": "Facility Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Facilty_Num",
		"group": "Contact",
		"label": "Facilty Number",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "FacNo",
		"group": "Personalization",
		"label": "Facility Number",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "FaxTYPE",
		"group": "Fax Number",
		"label": "Fax Type",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "FoodPantry",
		"group": "Personalization",
		"label": "Food Pantry",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "FormerName",
		"group": "Contact",
		"label": "Former Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "FullName",
		"group": "Contact",
		"label": "Full Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "HDF_Items_01",
		"group": "Personalization",
		"label": "HDF Items 01",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "HDF_Items_02",
		"group": "Personalization",
		"label": "HDF Items 02",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "HDF_Items_03",
		"group": "Personalization",
		"label": "HDF Items 03",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "HDF_Items_04",
		"group": "Personalization",
		"label": "HDF Items 04",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "HDF_Items_05",
		"group": "Personalization",
		"label": "HDF Items 05",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Headline",
		"group": "Personalization",
		"label": "Headline",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Headline_1",
		"group": "Personalization",
		"label": "Headline One",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Headline_2",
		"group": "Personalization",
		"label": "Headline Two",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "HHA",
		"group": "Personalization",
		"label": "HHA",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "HHAnum",
		"group": "Personalization",
		"label": "HHA Number",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "HighDemandItems",
		"group": "Personalization",
		"label": "High Demand Items",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "HospitalSystem",
		"group": "Personalization",
		"label": "Hospital System",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Hours",
		"group": "Personalization",
		"label": "Hours",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Infusion",
		"group": "Personalization",
		"label": "Infusion",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "InsideMessage",
		"group": "Personalization",
		"label": "Inside Message",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "IR_Hosp_01_City",
		"group": "Contact",
		"label": "IR Hosp One City",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "IR_Hosp_01_Name",
		"group": "Contact",
		"label": "IR Hosp One Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "IR_Hosp_01_State",
		"group": "Contact",
		"label": "IR Hosp One State",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "IR_Hosp_02_City",
		"group": "Contact",
		"label": "IR Hosp Two City",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "IR_Hosp_02_Name",
		"group": "Contact",
		"label": "IR Hosp Two Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "IR_Hosp_02_State",
		"group": "Contact",
		"label": "IR Hosp Two State",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L_Alignment",
		"group": "Personalization",
		"label": "Alignment",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "L_Bold",
		"group": "Personalization",
		"label": "Bold",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "L_Size",
		"group": "Personalization",
		"label": "Size",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "L00",
		"group": "Personalization",
		"label": "L00",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L01",
		"group": "Personalization",
		"label": "L01",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L02",
		"group": "Personalization",
		"label": "L02",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L03",
		"group": "Personalization",
		"label": "L03",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L04",
		"group": "Personalization",
		"label": "L04",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L05",
		"group": "Personalization",
		"label": "L05",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L06",
		"group": "Personalization",
		"label": "L06",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L07",
		"group": "Personalization",
		"label": "L07",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L08",
		"group": "Personalization",
		"label": "L08",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L09",
		"group": "Personalization",
		"label": "L09",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L10",
		"group": "Personalization",
		"label": "L10",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L11",
		"group": "Personalization",
		"label": "L11",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L12",
		"group": "Personalization",
		"label": "L12",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L13",
		"group": "Personalization",
		"label": "L13",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L14",
		"group": "Personalization",
		"label": "L14",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L15",
		"group": "Personalization",
		"label": "L15",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L16",
		"group": "Personalization",
		"label": "L16",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L17",
		"group": "Personalization",
		"label": "L17",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L18",
		"group": "Personalization",
		"label": "L18",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L19",
		"group": "Personalization",
		"label": "L19",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L20",
		"group": "Personalization",
		"label": "L20",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L21",
		"group": "Personalization",
		"label": "L21",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L22",
		"group": "Personalization",
		"label": "L22",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L23",
		"group": "Personalization",
		"label": "L23",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L24",
		"group": "Personalization",
		"label": "L24",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "L25",
		"group": "Personalization",
		"label": "L25",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Lic",
		"group": "Personalization",
		"label": "License",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "LIC_No",
		"group": "Personalization",
		"label": "License Number",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "LIC_Year",
		"group": "Personalization",
		"label": "License Year",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Licyear",
		"group": "Personalization",
		"label": "License Year",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Line_of_business",
		"group": "Personalization",
		"label": "Line of business",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "LineOfService",
		"group": "Personalization",
		"label": "Line Of Service",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "LineOfService1",
		"group": "Personalization",
		"label": "Line Of Service One",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "LineOfService2",
		"group": "Personalization",
		"label": "Line Of Service Two",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Mailing",
		"group": "Personalization",
		"label": "Mailing",
		"display_label": "1",
		"type": "File"
	},
	{
		"spec": "MapFileName",
		"group": "Personalization",
		"label": "Map File Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Medicaid",
		"group": "Personalization",
		"label": "Medicaid",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Medicare",
		"group": "Personalization",
		"label": "Medicare",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Month",
		"group": "Personalization",
		"label": "Month",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Month01",
		"group": "Personalization",
		"label": "Month One",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Month02",
		"group": "Personalization",
		"label": "Month Two",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Monthly_Rate",
		"group": "Personalization",
		"label": "Monthly Rate",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "MS_Name",
		"group": "Contact",
		"label": "Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Name",
		"group": "Contact",
		"label": "Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Name_First",
		"group": "Contact",
		"label": "Name First",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Name_Last",
		"group": "Contact",
		"label": "Name Last",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "NameofCamp",
		"group": "Contact",
		"label": "Name of Camp",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Offering",
		"group": "Personalization",
		"label": "Offering",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Organization1",
		"group": "Personalization",
		"label": "Organization One",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Organization2",
		"group": "Personalization",
		"label": "Organization Two",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Organization3",
		"group": "Personalization",
		"label": "Organization Three",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Organization4",
		"group": "Personalization",
		"label": "Organization Four",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Paragraph",
		"group": "Personalization",
		"label": "Paragraph",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Partner_Logo",
		"group": "Personalization",
		"label": "Partner Logo",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "PersonnelNo",
		"group": "Personalization",
		"label": "Personnel Number",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Phone1NUM_Label",
		"group": "Phone",
		"label": "Phone One Label",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Phone1Type",
		"group": "Phone",
		"label": "Phone One Type",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Phone2NUM_Label",
		"group": "Phone 2",
		"label": "Phone Two Label",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Phone2Type",
		"group": "Phone 2",
		"label": "Type",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Phone3Label",
		"group": "Phone 3",
		"label": "Phone Three Label",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Phone3NUM_Label",
		"group": "Phone 3",
		"label": "Phone Three Label",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Phone3Type",
		"group": "Phone 3",
		"label": "Phone Three Type",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Phone4Label",
		"group": "Phone 4",
		"label": "Phone Four Label",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Phone4NUM_Label",
		"group": "Phone 4",
		"label": "Phone Four Label",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Phone4Type",
		"group": "Phone 4",
		"label": "Phone Four",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "PhoneType",
		"group": "Phone",
		"label": "Phone Type",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Photo_Upload",
		"group": "Personalization",
		"label": "Photo Upload",
		"display_label": "1",
		"type": "File"
	},
	{
		"spec": "Place",
		"group": "Personalization",
		"label": "Place",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "POLAS_Orient",
		"group": "Personalization",
		"label": "POLAS Orient",
		"display_label": "1",
	"type": "hidden"
	},
	{
		"spec": "POLAS_Size",
		"group": "Personalization",
		"label": "POLAS Size",
		"display_label": "1",
	"type": "hidden"
	},
	{
		"spec": "ProductID",
		"group": "Personalization",
		"label": "Product ID",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Program",
		"group": "Personalization",
		"label": "Program",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "QIO_Name",
		"group": "Personalization",
		"label": "QIO Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "QIO_Phone",
		"group": "Personalization",
		"label": "QIO Phone",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "QIO_TTY",
		"group": "Personalization",
		"label": "TTY",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Refreshments",
		"group": "Personalization",
		"label": "Refreshments",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "RegionalOffice",
		"group": "Contact",
		"label": "Regional Office",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "ReplyContact",
		"group": "Contact",
		"label": "Reply Contact",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "ReplyDay",
		"group": "Personalization",
		"label": "Reply Day",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "ReplyMonth",
		"group": "Personalization",
		"label": "Reply Month",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "ReplyName",
		"group": "Personalization",
		"label": "Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "ReplyYear",
		"group": "Personalization",
		"label": "Reply Year",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "RSVP_Day",
		"group": "Personalization",
		"label": "RSVP Day",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "RSVP_Month",
		"group": "Personalization",
		"label": "RSVP Month",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "RSVP_Year",
		"group": "Personalization",
		"label": "RSVP Year",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S01",
		"group": "Personalization",
		"label": "S01",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S02",
		"group": "Personalization",
		"label": "S02",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S03",
		"group": "Personalization",
		"label": "S03",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S04",
		"group": "Personalization",
		"label": "S04",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S05",
		"group": "Personalization",
		"label": "S05",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S06",
		"group": "Personalization",
		"label": "S06",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S07",
		"group": "Personalization",
		"label": "S07",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S08",
		"group": "Personalization",
		"label": "S08",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S09",
		"group": "Personalization",
		"label": "S09",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S10",
		"group": "Personalization",
		"label": "S10",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S11",
		"group": "Personalization",
		"label": "S11",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "S12",
		"group": "Personalization",
		"label": "S12",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Same",
		"group": "Personalization",
		"label": "Same",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "SelectedAward01",
		"group": "Personalization",
		"label": "Selected Award One",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "SelectedAward02",
		"group": "Personalization",
		"label": "Selected Award Two",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Service1",
		"group": "Personalization",
		"label": "Service One",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Service2",
		"group": "Personalization",
		"label": "Service Two",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Service3",
		"group": "Personalization",
		"label": "Service Three",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Service4",
		"group": "Personalization",
		"label": "Service Four",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Slogan",
		"group": "Personalization",
		"label": "Slogan",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Star_Rating",
		"group": "Personalization",
		"label": "Star Rating",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Start_AM_PM",
		"group": "Personalization",
		"label": "Start AM\/PM",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Start_Time",
		"group": "Personalization",
		"label": "Start Time",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "StartTime",
		"group": "Personalization",
		"label": "Start Time",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Subline",
		"group": "Personalization",
		"label": "Subline",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "TDDTTY",
		"group": "TDD\/TTY",
		"label": "TTY",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "TDDTTYABBR",
		"group": "TDD\/TTY ABBR",
		"label": "ABBR",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Time",
		"group": "Personalization",
		"label": "Time",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Time_01Start",
		"group": "Personalization",
		"label": "Time Start",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Time_02End",
		"group": "Personalization",
		"label": "Time End",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Time1",
		"group": "Personalization",
		"label": "Time One",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Time2",
		"group": "Personalization",
		"label": "Time Two",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Title",
		"group": "Contact",
		"label": "Title",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Title_1",
		"group": "Contact",
		"label": "Title 1",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Title_2",
		"group": "Contact",
		"label": "Title 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "TollFreeTYPE",
		"group": "Toll Free",
		"label": "Toll Free Type",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "UG_City",
		"group": "Contact",
		"label": "UG City",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "UG_Name",
		"group": "Contact",
		"label": "UG Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "UG_State",
		"group": "Contact",
		"label": "UG State",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Unique_Specialty_01",
		"group": "Personalization",
		"label": "Unique Specialty 01",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Unique_Specialty_02",
		"group": "Personalization",
		"label": "Unique Specialty 02",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Unique_Specialty_03",
		"group": "Personalization",
		"label": "Unique Specialty 03",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Unique_Specialty_04",
		"group": "Personalization",
		"label": "Unique Specialty 04",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Unique_Specialty_05",
		"group": "Personalization",
		"label": "Unique Specialty 05",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "v01_Allscripts_ECIN",
		"group": "Personalization",
		"label": "ECIN",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "v01_Time_Frame_Start",
		"group": "Personalization",
		"label": "Time Frame Start",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V01Name",
		"group": "Contact",
		"label": "Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "v02_LegacyName",
		"group": "Contact",
		"label": "Legacy Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "v02_Time_Frame_End",
		"group": "Personalization",
		"label": "Time Frame End",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V02Title1",
		"group": "Contact",
		"label": "Title",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "v03_Central_Intake",
		"group": "Personalization",
		"label": "Central Intake",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "v03_Date",
		"group": "Personalization",
		"label": "Date",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "v04_Time",
		"group": "Personalization",
		"label": "Time",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "v05_Place_Name",
		"group": "Contact",
		"label": "Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V11Phone5_Label",
		"group": "Phone 5",
		"label": "Phone Five Label",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "V12EmailAddress",
		"group": "Contact",
		"label": "Email Address",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V13WebAddress",
		"group": "Contact",
		"label": "Web Address",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V14_Photo",
		"group": "Personalization",
		"label": "Photo",
		"display_label": "1",
		"type": "File"
	},
	{
		"spec": "V14AwardChoice01",
		"group": "Personalization",
		"label": "AwardChoice 1",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "V14AwardChoice02",
		"group": "Personalization",
		"label": "AwardChoice 2",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "V14AwardFile01",
		"group": "Personalization",
		"label": "Award File 1",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V14AwardFile02",
		"group": "Personalization",
		"label": "Award File 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V15_FirstName",
		"group": "Contact",
		"label": "First Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V15_Name",
		"group": "Contact",
		"label": "Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V16_Credentials",
		"group": "Contact",
		"label": "Credentials",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V16_LastName",
		"group": "Contact",
		"label": "Last Name",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V17_Title",
		"group": "Contact",
		"label": "Title",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V17_Title_01",
		"group": "Contact",
		"label": "Title 1",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V17_Title_02",
		"group": "Contact",
		"label": "Title 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V18_Lic_Expire",
		"group": "Personalization",
		"label": "License Expiration",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "V19_Specialty",
		"group": "Personalization",
		"label": "Speciality",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Vet_Logo",
		"group": "Personalization",
		"label": "Vet Logo",
		"display_label": "1",
		"type": "hidden"
	},
	{
		"spec": "VetLogo",
		"group": "Personalization",
		"label": "Vet Logo",
		"display_label": "1",
		"type": "hideden"
	},
	{
		"spec": "Vol_Position_01",
		"group": "Personalization",
		"label": "Vol Position 01",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Vol_Position_02",
		"group": "Personalization",
		"label": "Vol Position 02",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Vol_Position_03",
		"group": "Personalization",
		"label": "Vol Position 03",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Vol_Position_04",
		"group": "Personalization",
		"label": "Vol Position 04",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Vol_Position_05",
		"group": "Personalization",
		"label": "Vol Position 05",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Vol_Position_06",
		"group": "Personalization",
		"label": "Vol Position 06",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Vol_Position_07",
		"group": "Personalization",
		"label": "Vol Position 07",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Vol_Position_08",
		"group": "Personalization",
		"label": "Vol Position 08",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "WebAddress",
		"group": "Contact",
		"label": "Web Address",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Website",
		"group": "Contact",
		"label": "Web Address",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "WindowSelection",
		"group": "Personalization",
		"label": "Window Selection",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Year",
		"group": "Personalization",
		"label": "Year",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Year01",
		"group": "Personalization",
		"label": "Year One",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Year02",
		"group": "Personalization",
		"label": "Year Two",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "aroundtheClockCare",
		"group": "Hourly Care Pricing",
		"label": "3 Days Around the Clock care",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "allDayCare",
		"group": "Hourly Care Pricing",
		"label": "8 to 4 Care",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "halfdayCare",
		"group": "Hourly Care Pricing",
		"label": "8 to Noon Care",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "perHour",
		"group": "Hourly Care Pricing",
		"label": "Per Hour Charge",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Z_City_2",
		"group": "Contact",
		"label": "City 2",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "CL_PhoneAC",
		"group": "Consulting Line",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "CL_PhoneEX",
		"group": "Consulting Line",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "CL_PhoneNUM",
		"group": "Consulting Line",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PF_PhoneAC",
		"group": "Kindred Palliative Fax",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PF_PhoneEX",
		"group": "Kindred Palliative Fax",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "PF_PhoneNUM",
		"group": "Kindred Palliative Fax",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "Pal_Email",
		"group": "Kindred Palliative Email",
		"label": "Kindred Palliative Email",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "SpecProg01",
		"group": "Personalization",
		"label": "Specialty 1",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "SpecProg02",
		"group": "Personalization",
		"label": "Specialty 2",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "SpecProg03",
		"group": "Personalization",
		"label": "Specialty 3",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "SpecProg04",
		"group": "Personalization",
		"label": "Specialty 4",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Program1",
		"group": "Specialty Programs",
		"label": "Progran 1",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Program2",
		"group": "Specialty Programs",
		"label": "Progran 2",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Program3",
		"group": "Specialty Programs",
		"label": "Progran 3",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Program4",
		"group": "Specialty Programs",
		"label": "Progran 4",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Program5",
		"group": "Specialty Programs",
		"label": "Progran 5",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Program6",
		"group": "Specialty Programs",
		"label": "Progran 6",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Program7",
		"group": "Specialty Programs",
		"label": "Progran 7",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Program8",
		"group": "Specialty Programs",
		"label": "Progran 8",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Program9",
		"group": "Specialty Programs",
		"label": "Progran 9",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Program10",
		"group": "Specialty Programs",
		"label": "Progran 10",
		"display_label": "1",
		"type": "Selection"
	},
	{
		"spec": "Dollar_perMonth",
		"group": "Personalization",
		"label": "Price per Month",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "Dollar_perDay",
		"group": "Personalization",
		"label": "Price per Day",
		"display_label": "1",
		"type": "Text"
	},
	{
		"spec": "IntakeFaxAC",
		"group": "Intake Fax Number",
		"label": "Code",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "IntakeFaxEX",
		"group": "Intake Fax Number",
		"label": "Prefix",
		"display_label": "0",
		"type": "Text"
	},
	{
		"spec": "IntakeFaxNUM",
		"group": "Intake Fax Number",
		"label": "Number",
		"display_label": "0",
		"type": "Text"
	}
];
