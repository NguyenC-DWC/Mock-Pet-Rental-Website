//Adds the list of pet pictures for the user to display.
function addPets()
{
	var pets = ["Dog","Cat","Rabbit","Mouse"];
	
	for(i in pets)
	{
		$("#petSelection").append('<img src="images/' + pets[i] + '.png" />');
	}//end for
	
}//end addImages

//Sets the display once the user clicks on a pet.
function setPetDisplay()
{
	var newPhoto = $(this).attr("src");
	if($("#ageSelect").val() == 2)
	{
		newPhoto = newPhoto.slice(0,newPhoto.length-4);
		newPhoto += "C.png";
	}//end if
	
	$("#displayImage").stop(true).fadeTo(500, .1, "linear", function()
	{
		$("#displayImage").attr("src",newPhoto);	
		updateInfo();
	});//end function
	
	$("#displayImage").fadeTo(500,1);
	
}//end setPetDisplay

//If the user changes the age of the pet, change the display picture.
function setAgeDisplay()
{	
	var petType = $("#displayImage").attr("src");
	if(petType != "")
	{
		if($("#ageSelect").val() == 2)
		{
			petType = petType.slice(0,petType.length-4);
			petType += "C.png";
		}//end if
		
		else
		{
			petType = petType.slice(0,petType.length-5);
			petType += ".png";
		}//end else
		
		$("#displayImage").stop(true).fadeTo(500, .1, "linear", function()
		{
			$("#displayImage").attr("src",petType);
			updateInfo();	
		});//end function
	
		$("#displayImage").fadeTo(500,1);
	}//end if
}//end setAgeDisplay

//Updates the Pet Info Label.
function updateInfo()
{
	//Gets both the name and the pet species (from the name of the file).
	var petName = document.getElementById("petName").value;
	var petType = $("#displayImage").attr("src");
	
	if(petType == "")
	{
		$("#petLabel").html("Choose a Pet!");
	}//end if
	
	else if(petName == "")
	{
		$("#petLabel").html("Name your Pet!");
	}//end else if
	
	else
	{
		if($("#ageSelect").val() == 2)
		{
			petType = petType.slice(7,petType.length-5);
		}//end if
		
		else
		{
			petType = petType.slice(7,petType.length-4);
		}//end else
		
		$("#petLabel").html(petName + " the " + petType);
		
	}//end else
}//end updateInfo

//Functions to update the various pictures of the animal details.
function updateGenderPic()
{
	if(document.getElementById("gender1").checked)
	{
		$("#gender").attr("src","images/Male.png");
	}//end if
	else if(document.getElementById("gender2").checked)
	{
		$("#gender").attr("src","images/Female.png");
	}//end else if
	else
	{
		$("#gender").attr("src","");
	}//end else
}//end updateGenderPic

function updateHeartPic()
{
	if(document.getElementById("neutered").checked)
	{
		$("#love").attr("src","images/NoHeart.png");
	}//end if
	else
	{
		$("#love").attr("src","images/Heart.png");
	}//end else
}//end updateHeartPic

//Load user functions for HTML.
$(document).ready
(
	function()
	{
		//Functions to set up page at start
		addPets();
		updateInfo();
		updateHeartPic();
		updateGenderPic();
		
		//Events for the various fields.
		$("#petName").keyup(updateInfo);
		$("#ageSelect").change(setAgeDisplay);
		$("#petSelection img").click(setPetDisplay);
		$("#gender1").change(updateGenderPic);
		$("#gender2").change(updateGenderPic);
		$("#neutered").change(updateHeartPic);
		$("#petSelection img").mouseenter(function ()
		{
			$(this).stop(true).animate({opacity:1},100);
		});//end mouseenter
		$("#petSelection img").mouseleave(function ()
		{
			$(this).stop(true).animate({opacity:.6},100);
		});//end mouseenter
		
		//Form validation.
		var validationObj = $("#orderForm").validate(
			{
				rules:
				{
					petName: {required:true, rangelength:[2,10]},
					gender: {required:true}
				},//end rules
				
				messages:
				{
					petName: {rangelength:"Please have a pet name between 2 to 10 characters."}
				},//end messages
				
				errorPlacement: function(error,element)
				{
					if(element.is(":radio"))
					{
						error.insertAfter($("input:radio:last").next("label"));
					}//end if
					else
					{
						error.insertAfter(element);
					}//end else
				}//end errorPlacement	
			}//end validation
		);// end validationObj
		
		validationObj.form();
		
		//Submit Validation
		$("form").submit
		(
			function(e)
			{
				if(!validationObj.form())
				{
					alert("Please fill in any required information correctly.");
					e.preventDefault();
				}//end if
			}//end listener
		);//end submit
	}//End function calls
);//end ready