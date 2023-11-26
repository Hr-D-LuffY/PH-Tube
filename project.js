const categorySec=async()=>{
    const res= await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data=await res.json();
    const dataArr=data.data;

    const catergorysection =document.getElementById("category_section");
    
    dataArr.forEach(element => {
        const secbtn= document.createElement("div");
        secbtn.classList.add("secbtn")
        secbtn.innerHTML=`
        <button onclick="displayData(${element.category_id})" class="btn rounded btnclr text-dark" type="button">${element.category}</button>
        `;
        catergorysection.appendChild(secbtn);
    });

    displayData(1000);
}

var curData='data';

const displayData=async(id)=>{
        const res= await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        const data=await res.json();
        const dataArr=data.data;
        curData=dataArr
        console.log(dataArr);
    
        displayVideo(dataArr);
        
}

const displayVideo=(dataArr)=>{
    const displaysection =document.getElementById("display_section");
        displaysection.innerHTML=" ";
        
        if (dataArr.length>0) {
            dataArr.forEach(element => {
                const disbox= document.createElement("div");
                disbox.classList.add("disbox")

                disbox.innerHTML=`
                <div class="img_box"><img class="box_img" src="${element.thumbnail}" alt="" srcset=""></div>
                <div class="des_box d-flex flex-wrap  mt-2 pt-2 ">
                    <div class="dp">
                        <img class="rounded-circle dp-img" src="${element.authors[0].profile_picture}" alt="dp" srcset="">
                    </div>
                    <div class="content_info">
                        <h5 class="fw-bolder">${element.title}</h5>
                        <p class="nv">${element.authors[0].profile_name}    ${verified(element.authors[0].verified)}</p>
                        <p class="nv">${element.others.views} views</p>
                        ${element.others.posted_date > 60 ? timing(element.others.posted_date) : ''}
                        
                    </div>
                </div>
                `;
                
                displaysection.appendChild(disbox);
            });
        } 
        else {
            const disbox= document.createElement("div");
                disbox.classList.add("disbox")
                disbox.innerHTML=`
                <div class="no_content d-block text-center">
                <img src="./PHero-Tube-main/Icon.png" alt="" srcset="">
                <h2>Oops!! Sorry, There is no</h2>
                <h2>content here</h2>
                </div>`;
                displaysection.appendChild(disbox);

        }
}

const sortby = () => {
    // console.log("Before sorting:", curData);

    curData.sort((a, b) => {
        // Extract views from the "others" key
        const viewsA = parseInt(a.others.views.replace('K', '000'));
        const viewsB = parseInt(b.others.views.replace('K', '000'));
        console.log(viewsA,viewsB);

        // Compare views
        return viewsB - viewsA;
    });

    displayVideo(curData);
};


const verified=(info)=>{
    if (info){
        return `<img class="verified" src="./PHero-Tube-main/verfied.png" alt="" srcset="">`
    }
    else{
        return ``;
    }
}

const timing=(info)=>{
    
        const hours = Math.floor(info / 3600);
        const minutes = Math.floor((info % 3600) / 60);
        return `<p class="  rounded text-white  timing" > ${hours}hrs ${minutes} min ago</p> `;
        
                        
}
categorySec();