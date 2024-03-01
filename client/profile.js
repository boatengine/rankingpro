const allDataList = document.getElementById('allDataList');
window.onload = async() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id') 
    if (id) {
        console.log(id)
        try {
            const response = await axios.get(`http://localhost:3000/api/getdata/${id}`)
            const data = response.data;
            // dispaly with html noty forecth use for normal
            htmlData = ''
            htmlData += '<tr>'
            htmlData += `<td>${data[0].id}</td>`
            htmlData += `<td>${data[0].name}</td>`
            htmlData += `<td><img class="img-profile" src="../server/${data[0].img}" ></img></td>`
            htmlData += `<td>${data[0].vote}</td>`
            htmlData += `<td><a href="index.html" class="btn btn-secondary">กลับ</a></td>`
            htmlData += '</tr>'

            allDataList.innerHTML = htmlData;
        } catch (error) {
            console.log(error.message)
        }
    }
}