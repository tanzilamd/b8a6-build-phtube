// Load Categories Name
const loadCategory = async () => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/categories`
    );
    const data = await res.json();

    const categoryArray = data.data;

    displayCategory(data.data);
};

// Display categories with btn
const displayCategory = (categoryArray) => {
    categoryArray.forEach((category) => {
        const categoryName = category.category;

        const CategoryBtnContainer = document.getElementById(
            "category-btn-container"
        );
        const newBtn = document.createElement("div");
        // newBtn.classList =
        //     "btn btn-info bg-[#25252533] hover:bg-[#25252533] border-none";
        newBtn.innerHTML = `
            <button class="btn btn-info bg-[#25252533] hover:bg-[#25252533] border-none" onclick="displayByCategory(${category.category_id})">${categoryName}</button>
        `;
        // newBtn.innerText = categoryName;
        // newBtn.setAttribute(
        //     "onclick",
        //     `${displayByCategory(category.category_id)}`
        // );

        // console.log(category.category_id);
        CategoryBtnContainer.appendChild(newBtn);
    });
};

// Load Data
const loadData = async (id = "1000") => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await res.json();

    const dataArray = data.data;
    displayData(data.data);
};

// Display Data
const displayData = (videoData) => {
    // Video container
    const videoContainer = document.getElementById("video-container");
    videoContainer.textContent = "";

    videoData.forEach((singleVideo) => {
        console.log(singleVideo);

        // show video
        const newVideo = document.createElement("div");
        newVideo.classList = "card card-compact bg-base-100 shadow-xl";

        newVideo.innerHTML = `
            <figure class="">
                <img class="" src="${singleVideo.thumbnail}" alt="Thumbnail"/>
            </figure>
            
            <div class="card-body">
                <div class="flex justify-between gap-2">
                    <div>
                        <img class="rounded-full w-16" src="${singleVideo.authors[0].profile_picture}" alt="Profile" />
                    </div>
                    
                    <div class="space-y-1 flex-1">
                        <h4 class="text-[#171717] font-bold text-sm">${singleVideo.title}</h4>
                        <p>${singleVideo.authors[0].profile_name}</p>
                        <span>${singleVideo.others.views} views</span>
                    </div>
                </div>
            </div>
        `;

        videoContainer.appendChild(newVideo);
    });
};

// Display by category
const displayByCategory = (id) => {
    loadData(id);
};

loadCategory();
loadData();
