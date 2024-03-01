
const BASE_URL = 'http://localhost:3000'
const uploadForm = document.getElementById('uploadForm');
const allDataList = document.getElementById('allDataList');
const imageContainer = document.getElementById('imageContainer');
let messageDOM = document.getElementById('message')
let numberoneDOM = document.getElementById('numberone')



// Event listener for form submission
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(uploadForm);
  try {
    await axios.post('http://localhost:3000/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Data uploaded successfully');

    uploadForm.reset();
    getAllData();
  } catch (error) {
    console.error(error);
    alert('Error uploading data');
  }
});

async function onthetop () {
    try {
        const response = await axios.get(`${BASE_URL}/api/numberone`);
        const data = response.data;
        for(let i = 0; i < data.length; i++) {
            // console.log(data[i].name)
            numberoneDOM.innerText = `${data[i].name}`
        }
    } catch (error) {
        console.log(error.message)
    }
}

// Function to get all data from the backend
async function getAllData() {
    
    onthetop()
  try {
    
    const response = await axios.get(`${BASE_URL}/api/getdata`);
    const data = response.data;
    // dispaly with html noty forecth use for normal
    htmlData = ''
    if (data == '') {
        // console.log('eiei')
        htmlData += '<tr><td colspan="12" class="text-center">ยังไม่มีข้อมูล</td></tr>'
    }else{
        for(let i = 0; i < data.length; i++) {
            htmlData += '<tr>'
            htmlData += `<td>${i+1}</td>`
            htmlData += `<td><img  height="25x" width="25x" class="rounded-circle " src="../server/${data[i].img}"></img></td>`
            htmlData += `<td>${data[i].name}</td>`
            htmlData += `<td class="text-danger"><b>${data[i].vote}</b></td>`
            htmlData += `<td><button class="btn btn-warning btn-sm add1" data-id="${data[i].id}" >+1</button></td>`
            htmlData += `<td><button class="btn btn-danger btn-sm add10" data-id="${data[i].id}" >+10</button></td>`
            htmlData += `<td><button class="btn btn-danger btn-sm add100" data-id="${data[i].id}" >+100</button></td>`
            htmlData += `<td><a href="profile.html?id=${data[i].id}"><button class="btn  btn-secondary  btn-sm detail">วีรกรรมตัวนี้</button></a></td>`
            // htmlData += `<td><button class="btn btn-sm btn-secondary  btn-sm delete" data-id="${data[i].id}" >DELETE</button></td>`
            htmlData += '</tr>'
        }   
    
        
    }
    allDataList.innerHTML = htmlData;
    
    // delete section
    const deleteDOm = document.getElementsByClassName('delete');

    for(let i = 0; i < deleteDOm.length; i++) {
        deleteDOm[i].addEventListener('click', async(Event) => {
            // ดึงdelete id
            const id = Event.target.dataset.id
            // console.log(id)
            try {
                await axios.delete(`${BASE_URL}/api/delete/${id}`)
                // console.log(response.data)
                getAllData()
            } catch (error) {
                console.log('error',error)
            }
        })
    }


    // update section
    
    const add1 = document.getElementsByClassName('add1');

    for(let i = 0; i < add1.length; i++) {
        add1[i].addEventListener('click', async(Event) => {
            // ดึงdelete id
            const addid = Event.target.dataset.id

            let updateUser = {
                vote: 1
            }
            // console.log(addid)
            try {
                await axios.patch(`${BASE_URL}/api/vote/${addid}`,updateUser)
                // console.log(response.data)
                getAllData()
                messageDOM.innerText ='โจทเพิ่มมมม 1'
                messageDOM.className = 'alert alert-info'
                setInterval(function () {
                                messageDOM.className = "alert alert-secondary", 
                                messageDOM.innerText ='โหวดเลยยย'
                            },5000);
            } catch (error) {
                console.log('error',error)
            }
        })
    }
    const add10 = document.getElementsByClassName('add10');

    for(let i = 0; i < add10.length; i++) {
        add10[i].addEventListener('click', async(Event) => {
            // ดึงdelete id
            const addid = Event.target.dataset.id

            let updateUser = {
                vote: 10
            }
            // console.log(addid)
            try {
                await axios.patch(`${BASE_URL}/api/vote/${addid}`,updateUser)
                // console.log(response.data)
                getAllData()
                messageDOM.innerText ='โจทเพิ่มมมม 10'
                messageDOM.className = 'alert alert-warning'
                setInterval(function () {
                                messageDOM.className = "alert alert-secondary", 
                                messageDOM.innerText ='โหวดเลยยย'
                            },5000);
            } catch (error) {
                console.log('error',error)
            }
        })
    }
    const add100 = document.getElementsByClassName('add100');

    for(let i = 0; i < add100.length; i++) {
        add100[i].addEventListener('click', async(Event) => {
            // ดึงdelete id
            const addid = Event.target.dataset.id

            let updateUser = {
                vote: 100
            }
            // console.log(addid)
            try {
                await axios.patch(`${BASE_URL}/api/vote/${addid}`,updateUser)
                // console.log(response.data)
                getAllData()
                messageDOM.innerText ='เย้ดแม่ไอ้ตัวนี้หนักจริง 100+++'
                messageDOM.className = 'alert alert-danger'
                setInterval(function () {
                                messageDOM.className = "alert alert-secondary", 
                                messageDOM.innerText ='โหวดเลยยย'
                            },5000);
            } catch (error) {
                console.log('error',error)
            }
        })
        
    }
    
    // Display data in the HTML

  } catch (error) {
    console.error(error);
    alert('Error fetching data');
  }

 
}


// Function to display an image
// Initial load of data
getAllData();