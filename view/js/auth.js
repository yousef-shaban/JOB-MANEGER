const auth_op = document.getElementById("auth-btn")
const logout_btn = document.getElementById("logout-btn");


auth_op.addEventListener("click", async (e) => {
    e.preventDefault();
    if(auth_op.getAttribute("data-op") === "login")
    {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        // https://job-api-node01.herokuapp.com/api/v1/auth/login
        authFunc("http://localhost:3000/api/v1/auth/login", { email, password })
        

        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("token", `${data.token}`);
            location.assign("http://localhost:3000/");})

    }


    else if(auth_op.getAttribute("data-op") === "register")
    {
        const name = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        authFunc("http://localhost:3000/api/v1/auth/register", {
            name,
            email,
            password,
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem("token", `${data.token}`);
            location.assign("http://localhost:3000/");
        });
    }
        
});



const authFunc = async (url, Credentials)=>{
    return fetch(url, {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"content-type": "application/json",
			},
			body: JSON.stringify({
				...Credentials
			}),
		});
}
