const bt = document.getElementById("info-btn")
const dropDown = document.getElementsByClassName("dropdown");
const logout_btn = document.getElementById("logout-btn");
const edit_btn = document.querySelectorAll("edit-c")

bt.addEventListener("click", (e)=>{
    dropDown[0].classList.toggle("visible")
})


logout_btn.addEventListener("click", (e) => {
    localStorage.clear()
	location.assign("http://localhost:3000/logout");

});

