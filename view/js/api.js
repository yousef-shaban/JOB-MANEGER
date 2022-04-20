const addJobBtn = document.getElementById("addjob");
const position = document.getElementById("position");
const company = document.getElementById("company");
const jobs_container = document.getElementById("jobs-container");
const overlay = document.querySelector(".overlay")
const submit_edit = document.getElementById("submit-edit")





let job_position;
let job_company;
let job_status;
let job_id;


const renderjobs = (jobs)=>{
    jobs_container.innerHTML = ""
    jobs.jobs.forEach((e) => {
        job_temp = `
            <div class="logo"></div>
            <div class="position"><span>${e.position}</span></div>
            <div class="company"><span>${e.company}</span></div>
            <div class="date"><span>${e.createdAt}</span></div>
            <div class="status"><span>${e.status}</span></div>
            <div class="options">
                <p class="dl-btns">DL</p>
                <p class = "edit-btn">ED</p>
            </div>`
        let box = document.createElement("DIV");
        box.innerHTML = job_temp;
        box.setAttribute("class", "job");
        box.setAttribute("data-id", `${e._id}`);
        jobs_container.appendChild(box);
    });
}


const ADD_JOB = () => {
	return fetch("http://localhost:3000/api/v1/jobs", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"content-type": "application/json",
			authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ company: company.value, position: position.value }),
	});
};

const GET_JOB = ()=>{
    return fetch("http://localhost:3000/api/v1/jobs", {
			method: "GET",
			headers: {
				Accept: "application/json, text/plain, */*",
				"content-type": "application/json",
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
}

const DELETE_JOB = (id)=>{
    
    return fetch(`http://localhost:3000/api/v1/jobs/${id}`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
    }



addJobBtn.addEventListener("click", async (e)=>{
    e.preventDefault()
    await ADD_JOB().then((res) => res.json())
    const jobs = await GET_JOB().then((res)=> res.json())
    if(jobs.jobs.length === 0)
    {
        window.alert("NO JOBS YET")
    }else{
        renderjobs(jobs)
    }
})
addJobBtn.click()

document.body.addEventListener("click", async (e) => {
	if (e.target.className === "dl-btns") {
        const job_id = e.path[2].getAttribute("data-id");
        if(window.confirm("Delete the Task"))
        {
            const d = await DELETE_JOB(job_id)
            const jobs = await GET_JOB().then((data) => data.json())
            renderjobs(jobs)
            
        }
	}
    else if (e.target.className === "edit-btn") {
        job_company = e.path[2].children[2].innerText
        job_position = e.path[2].children[1].innerText
        job_status = e.path[2].children[4].innerText
        job_id = e.path[2].attributes[1].value
        // console.log(e);
        // console.log(job_company, job_position, job_status);
        
        overlay.classList.remove("hide")
        overlay.classList.add("visible")


        function functiondisable() {
            // To get the scroll position of current webpage
            let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
            let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft

                // if scroll happens, set it to the previous value
                window.onscroll = function () {
                    window.scrollTo(LeftScroll, TopScroll);
                };
        }

        function functionenable() {
            window.onscroll = function () {};
        }

        functiondisable();

        overlay.addEventListener("click", (e)=>{
            if(e.target.classList[0] === "overlay")
            {
                overlay.classList.remove("visible");
                overlay.classList.add("hide");
                functionenable();
            }
            
        })
	}
});

submit_edit.addEventListener("click", async (e)=>{
    
    const edit_position = document.getElementById("edit-position").value
    const edit_company = document.getElementById("edit-company").value;
    const edit_status = document.getElementById("edit-status").value;

    // console.log(edit_position, edit_company, edit_status);
    const data = await fetch(`http://localhost:3000/api/v1/jobs/${job_id}`, {
			method: "PATCH",
			headers: {
				Accept: "application/json, text/plain, */*",
				"content-type": "application/json",
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({
				position: edit_position,
                company: edit_company,
                status: edit_status
			}),

		}).then((res)=> res.json())
        overlay.classList.remove("visible");
        addJobBtn.click()
})