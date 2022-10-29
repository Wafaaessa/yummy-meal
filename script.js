// $(document).ready(function () {
let userName,
userEmail,
userPhone,
userAge,
userPassword,
userRePassword,
userNameAlert,
userEmailAlert,
userPhoneAlert,
userAgeAlert,
userpasswordAlert,
userRepasswordAlert;
isTrue = !0,
cont = [];
    // //////////////////home page///////////
    search("").then(() => {
        $("#load .spinner").fadeOut(100,function(){
            $("#load").fadeOut(100,function(){
            $("#load").remove()
            })
            
        })
    })
 
    // ////////////////nav///////////
$(".strip-toggel-menu").click(function () {
    isTrue ? ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"),
     Width = $(".nav-tab-menu").outerWidth() - 10, 
    $(".strip-header-nav").css("left", Width), 
    $(".fa-align-justify").toggleClass("fa-times"),
     $(".nav-tab-menu .item1").animate({
        paddingTop: "25px"
    }, 1100),
     $(".nav-tab-menu .item2").animate({
        paddingTop: "25px"
    }, 1200),
     $(".nav-tab-menu .item3").animate({
        paddingTop: "25px"
    }, 1300), 
    $(".nav-tab-menu .item4").animate({
        paddingTop: "25px"
    }, 1400),
     $(".nav-tab-menu .item5").animate({
        paddingTop: "25px"
    }, 1500),
     $(".nav-tab-menu .item6").animate({
        paddingTop: "25px"
    }, 1600), isTrue = !isTrue) : ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"),
     $(".fa-align-justify").toggleClass("fa-times"),
      $(".strip-header-nav").css("left", 0), 
     $(".nav-tab-menu li").animate({
        paddingTop: "500px"
    }, 500), isTrue = !isTrue)


});

/// //////////////////////////apis for category ,area,ingrediantds/////////////////
async function getCategories(listBy) {
    api = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
    api = await api.json()
    return api;
}

// /////////////////////////////////display meals////////////////////////////////
function displayMeals(cont) {
    let mealsContent = ""
    for (let i = 0; i < cont.length; i++) {
        mealsContent += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick="getMeal('${cont[i].idMeal}')" class="box-img shadow rounded ">
                <div class="img-container ">
                    <img src='${cont[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${cont[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    document.getElementById("rowData").innerHTML = mealsContent
  
}
////////////////////filters api//////////
async function filterCategory(category) {
   
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)
   
  }
  async function filterArea(area) {
 
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))


}
async function filterIngredient(mealName) {

    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meals = await meals.json()
    displayMeals(meals.meals)



}
////////////////////////display meal information and api//////////////
async function getMeal(ID) {
    let mealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`)
    mealApi = await mealApi.json()
    displayMeal(mealApi.meals[0])
}
function displayMeal(mealApi) {
    // ///////////////////recipes section////////////////
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (mealApi[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">
            ${mealApi[`strMeasure${i}`]} 
            ${mealApi[`strIngredient${i}`]}
            </li>`
        }
    }
// ////////////////////////tag section////////////////////
    let tagsWord = mealApi.strTags.split(",")
    let tagsStr = "" 
    for (let i = 0; i < tagsWord.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tagsWord[i]}</li>` 
    } 

    let cartoona = `
    <div class="col-md-4 myM text-white">
					<img class="w-100" src="${mealApi.strMealThumb}" alt=""srcset="">
                    <br>
					<h1>${mealApi.strMeal}</h1>
				</div>
				<div class="col-md-8  text-white text-left">
					<h2>Instructions</h2>
					<p>${mealApi.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${mealApi.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${mealApi.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex flex-wrap" id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${mealApi.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${mealApi.strYoutube}">Youtub</a>
				</div>`
    document.getElementById("rowData").innerHTML = cartoona;
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
  

}
//////////////////////////////////// display category///////////
function displayCategory(){
    let cart=``;
    for (let i = 0; i < cont.length; i++) {
     cart+=`      <div class="col-md-6 col-lg-3 my-3 shadow">
     <div class="img-container shadow rounded ">
         <div id="category-click" onclick="filterCategory('${cont[i].strCategory}')" class="box-img">
            <img src="${cont[i].strCategoryThumb}" class="w-100 rounded">
             <div class="layer d-flex align-items-center ">
                 <div class="info p-2">
                     <h2 class="mt-5">${cont[i].strCategory}</h2>
                     <p>${cont[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                 </div>
             </div>
         </div>
     </div>
 </div>`
//  console.log(cont[0].strCategoryThumb);
    } 
    document.getElementById('rowData').innerHTML = cart;
}
////////////////////////////// display area//////////////////////
function displayArea() {
    let cart2=``;
        for (let i = 0; i < cont.length; i++) {
            cart2+=`<div class="col-md-6 col-lg-3 my-3   shadow">
            <div class="img-container shadow rounded ">
                <div id="area-click" onclick="(filterArea('${cont[i].strArea}'))" class="box-img ">
                    <i class="fa-solid fa-city fa-3x"></i>
                    <h2 class="text-white">${cont[i].strArea}</h2>
                </div>
            </div>
        </div>`;
        }
        document.getElementById('rowData').innerHTML = cart2;
    
    }
/////////////////////displayIngredients////////////////
    function displayIngredients() {
        let cart3=``
        for (let i = 0; i < cont.length; i++) {
        cart3+=`    <div class="col-md-6 col-lg-3 my-3  shadow">
        <div id ="ingredients-click" onclick="filterIngredient('${cont[i].strIngredient}')" class="box-img ">
      <div class="img-container">
        <i class="fa-solid fa-bowl-food fa-3x"></i>
        <h2 class="text-white">${cont[i].strIngredient}</h2>
        <p class="text-white">${cont[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
          </div>
      </div>
    </div>`;
            
        }
        document.getElementById('rowData').innerHTML = cart3;
    
    }
// /////////////////////////search input//////////////////////////
async function search(q) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    return meals
}
async function getLetter(letter) {
    if (letter) {
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
    }
}


////////////////////////////////////// clicks in nav////////////////////
$(".nav-item a").click(async (e) => {
    let listBy = e.target.getAttribute("data-list")
    document.getElementById("search-container").innerHTML = ""
    document.getElementById("rowData").innerHTML = ""
    let api;
if (listBy == "categories") {
    api = await getCategories(listBy + ".php")
    cont = api.categories.splice(0, 20);
    displayCategory()

} else if (listBy == "a") {

    api = await getCategories("list.php?a=list")
    cont = api.meals.splice(0, 20);
    displayArea()


} else if (listBy == "i") {
   
    api = await getCategories("list.php?i=list")
    cont = api.meals.splice(0, 20);
    displayIngredients()
   
   
}
if (listBy == "search") {
    document.getElementById("rowData").innerHTML = ""
    document.getElementById("search-container").innerHTML = `
    <div class="row">
  
            <div class="col-md-6">
            <input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input class="form-control " type="text" maxlength="1" id="letter"
                    placeholder="search By First Letter...">
            </div>

        </div>`

    $("#searchInput").keyup((e) => {
        search(e.target.value)
    })
    $("#letter").keyup((e) => {
        getLetter(e.target.value)
    })

  
}
// ///////////////////////////////////////contact//////////////////////////
if (listBy == "contact") {

    document.getElementById("rowData").innerHTML = `
    <section id="contact" class="container myM w-75 mx-auto mb-5 ">
    <div class="p-2">
        <h2 class="text-light text-center mb-5">ContacUs...</h2>
        <div class="row g-3">
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control shadow " onkeyup="validation()" id="name"
                        placeholder="Enter Your Name">
                    <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
                        Special Characters and Numbers not allowed
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
                    <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
                        Enter valid email. *Ex: xxx@yyy.zzz
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
                    <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
                        Enter valid Phone Number
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
                    <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
                        Enter valid Age
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" type="password" id="password"
                        placeholder="Enter Password">
                    <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input onkeyup="validation()" class="form-control" type="password" id="rePassword"
                        placeholder="Enter RePassword">
                    <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
                        Enter valid Repassword
                    </div>
                </div>
            </div>


        </div>

        <button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-3 ">Submit</button>
    </div>

</section>`
userName = document.getElementById("name"),
userEmail = document.getElementById("email"),
userPhone = document.getElementById("phone"),
userAge = document.getElementById("age"),
userPassword = document.getElementById("password"),
userRePassword = document.getElementById("rePassword"),
userNameAlert = document.getElementById("namealert"),
userEmailAlert = document.getElementById("emailalert"),
userPhoneAlert = document.getElementById("phonealert"),
userAgeAlert = document.getElementById("agealert"),
userpasswordAlert = document.getElementById("passwordalert"),
userRepasswordAlert = document.getElementById("repasswordalert");
if(userName!=null){
    userName.addEventListener("focus", () => {
        nameInput = true
    })
}
if(userEmail!=null){
    userEmail.addEventListener("focus", () => {
        emailInput = true
    })
}
if(userPhone!=null){
    userPhone.addEventListener("focus", () => {
        phoneInput = true
    })
}

if(userAge!=null){
    userAge.addEventListener("focus", () => {
        ageInput = true
    })
}
if(userPassword!=null){
    userPassword.addEventListener("focus", () => {
        passwordInput = true
    })
}

if(userRePassword!=null){
    userRePassword.addEventListener("focus", () => {
        repasswordInput = true
    })
}


}

})
// //////////////////valid///////////////////////////////
let nameInput = false,
    emailInput = false,
    phoneInput = false,
    ageInput = false,
    passwordInput = false,
    repasswordInput = false;
function validation() {

    if (nameInput) {
        if (NameValid()) {
            userName.classList.remove("is-invalid")
            userName.classList.add("is-valid")
            userNameAlert.classList.replace("d-block", "d-none")
            userNameAlert.classList.replace("d-block", "d-none")

        } else {
            userName.classList.replace("is-valid", "is-invalid")
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }

    if (emailInput) {
        if (EmailValid()) {
            userEmail.classList.remove("is-invalid")
            userEmail.classList.add("is-valid")
            userEmailAlert.classList.replace("d-block", "d-none")
            userEmailAlert.classList.replace("d-block", "d-none")
        } else {
            userEmail.classList.replace("is-valid", "is-invalid")
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }

    if (phoneInput) {
        if (PhoneValid()) {
            userPhone.classList.remove("is-invalid")
            userPhone.classList.add("is-valid")
            userPhoneAlert.classList.replace("d-block", "d-none")
            userPhoneAlert.classList.replace("d-block", "d-none")
        } else {
            userPhone.classList.replace("is-valid", "is-invalid")
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }

    if (ageInput) {
        if (AgeValid()) {
            userAge.classList.remove("is-invalid")
            userAge.classList.add("is-valid")
            userAgeAlert.classList.replace("d-block", "d-none")
            userAgeAlert.classList.replace("d-block", "d-none")
        } else {
            userAge.classList.replace("is-valid", "is-invalid")
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }

    if (passwordInput) {
        if (PasswordValid()) {
            userPassword.classList.remove("is-invalid")
            userPassword.classList.add("is-valid")
            userpasswordAlert.classList.replace("d-block", "d-none")
            userpasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userPassword.classList.replace("is-valid", "is-invalid")
            userpasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if (repasswordInput) {
        if (RePasswordValid()) {
            userRePassword.classList.remove("is-invalid")
            userRePassword.classList.add("is-valid")
            userRepasswordAlert.classList.replace("d-block", "d-none")
            userRepasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userRePassword.classList.replace("is-valid", "is-invalid")
            userRepasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if(NameValid() && EmailValid() && PhoneValid() && AgeValid() && PasswordValid() && RePasswordValid()){
        document.getElementById("submitBtn").removeAttribute("disabled")
    }else{
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }

}

function NameValid() {
    return /^[a-zA-Z ]+$/.test(userName.value)
}

function EmailValid() {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userEmail.value)
}

function PhoneValid() {
    return /^(002)?01[0125][0-9]{8}$/.test(userPhone.value)
}

function AgeValid() {
    return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function PasswordValid() {
    return /^[A-Z][a-z][0-9]{8,}$/.test(userPassword.value)
}

function RePasswordValid() {
    return userPassword.value == userRePassword.value
}


// })
