// A shortcut method to get all elements
(function(){
    "use strict";
    
    var el = function(element){
        if (element.charAt(0) === "#"){  //If an ID is passed
            return document.querySelector(element); // Return a single element
        }
        return document.querySelectorAll(element); //Else, returns a nodelist
    }

    //Variable declaration
    var viewer = el("#viewer"), //The calculator screen wher result will be displayed
          equals = el("#equals"), //Equal to 
          nums = el(".num"), //List of all numbers
          operators = el(".ops"), //List of all operators
          theNum = "", //Current number
          oldNum = "", //First number
          resultNum, //Result
          operator ; //

    // To get the number when clicked
    var setNum = function(){
        if(resultNum){ //If a result was displayed, reset number
            theNum = this.getAttribute("data-num");
            resultNum = "";
        }else{ // Else, add digit to previous number (this is a string)
            theNum += this.getAttribute("data-num")
        }

        viewer.innerHTML = theNum; //To display the number
    };

    // When operator is clicked. pass number to oldnum and save operator
        var moveNum = function(){
            oldNum = theNum;
            theNum = "";
            operator = this.getAttribute("data-ops");

            equals.setAttribute("data.result", "" ) // Reset result in attribute
        };

        // When Equals is clicked. To calculate result
        var displayNum = function(){

            // Convert input to numbers
            oldNum = parseFloat(oldNum);
            theNum = parseFloat(theNum);

            // To perform operation
            switch (operator){
                case "plus":
                    resultNum =
                    oldNum + theNum;
                    break;

                    case "minus":
                        resultNum = 
                    oldNum - theNum;
                    break;

                    case "times":
                        resultNum = 
                    oldNum * theNum;
                    break;

                    case "divided by":
                        resultNum =
                    oldNum / theNum;
                    break;

                // to keep the number and continue if equal to is pressed without an operator 

                default:
                    resultNum = theNum;
            }
            //  if NaN or infinity returned
            if(isFinite(resultNum)){
                if(isNaN(resultNum)){
                    // if result is not a number; set off by double-clicking operators
                    resultNum = "Exponential Error"
                }
            }
            // To display result
            viewer.innerHTML = resultNum;

            equals.setAttribute("data-result", resultNum);

            // To reset oldNum & kepp result
            oldNum = 0;
            theNum = resultNum;
        };
        //  To clear everything when clear button is pressed. 

        var clearAll = function(){
            oldNum = "";
            theNum = "";
            viewer.innerHTML = "0";

            equals.setAttribute("data-result", resultNum);
        };

        // Click events

        // Add click events to numbers
        for (var i = 0, l = nums.length; i < l; i++){
            nums[i].onclick = setNum;
        }
         // Add click events to operators
        for (var i = 0, l = operators.length; i < l; i++){
            operators[i].onclick = moveNum;
        }
         // Add click events to equal to sign
         equals.onclick = displayNum;
         
         // Add click events to clear button
         el("#clear").onclick = clearAll;
}())