
function readURL(input) {
    
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
        e.preventDefault()
        $('#file_upload')
          .attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);

    }

    handleImageUpload(input.files[0])
  }

function handleImageUpload(input){

    const formData = new FormData
    formData.append('file', input)
    console.log(formData.getAll("file"))

    fetch("/insereimagem", {

        method:"POST", 
        body:formData

    })

}

async function getFromBackend(){
    await fetch("/imagens", {

        method:"GET", 

    })
    .then(response => {

        return response.json()
        
    })

    .then(value => {

        const data = document.getElementById("load")
        data.src = "/imagens_do_pai/" + value.URL

    }) 
}

getFromBackend()

  