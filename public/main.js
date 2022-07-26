const deleteButton = document.querySelectorAll('.fa-trash') // setting a variable of deletebutton which contains all trash can icons with .fa-trash class

Array.from(deleteButton).forEach((element)=>{ 
    element.addEventListener('click', deleteItem) 
})

async function deleteItem() {
    console.log('CLICKED')
    console.log(this.parentNode.childNodes[1].innerText)
    const itemText = this.parentNode.childNodes[1].innerText 
    try{ 
        const response = await fetch('deleteEntry', { 
            method: 'delete', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
              'itemFromJS': itemText 
            }) 
          }) 
        const data = await response.json() 
        console.log(data) 
        location.reload() 

    }catch(err){ 
        console.log(err)  
    }     
}