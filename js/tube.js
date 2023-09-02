let apiId = 1000;
let allViews = [];
let allViewsInt = [];

// Load Categories Name
const loadCategory = async () => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/categories`
    );
    const data = await res.json();

    const categoryArray = data.data;

    displayCategory(categoryArray);
};

// Display categories with btn
const displayCategory = (categoryArray) => {
    categoryArray.forEach((category) => {
        const categoryName = category.category;

        const CategoryBtnContainer = document.getElementById(
            "category-btn-container"
        );
        const newBtn = document.createElement("div");

        newBtn.innerHTML = `
            <button class="btn btn-info btn-category bg-[#25252533] hover:bg-[#25252533] border-none" onclick="displayByCategory(${category.category_id})">${categoryName}</button>
        `;

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
    displayData(dataArray);
    apiId = id;
    console.log(apiId);
};

// Display Data
const displayData = (videoData) => {
    // Video container
    const videoContainer = document.getElementById("video-container");
    videoContainer.textContent = "";

    if (videoData.length < 1) {
        const noVideoAvailable = document.getElementById("no-video-available");
        noVideoAvailable.style.display = "block";
    } else {
        const noVideoAvailable = document.getElementById("no-video-available");
        noVideoAvailable.style.display = "none";
    }

    videoData.forEach((singleVideo) => {
        // Second to minute & hrs
        let second;
        let totalMinutes;
        let minute;
        let hour;
        let displayBadge = "block";

        if (singleVideo?.others?.posted_date) {
            second = singleVideo?.others?.posted_date;
            totalMinutes = Math.floor(second / 60);

            minute = totalMinutes % 60;
            hour = Math.floor(totalMinutes / 60);

            if (hour > 24) {
                days = Math.floor(hour / 24);
                hour = hour % 24;
            }
        } else {
            displayBadge = "hidden";
        }

        // show video
        const newVideo = document.createElement("div");
        newVideo.classList = "card card-compact bg-base-100 shadow-xl";

        newVideo.innerHTML = `
            <figure class="relative">
                <img class="w-[100%] md:h-48" src="${
                    singleVideo.thumbnail
                }" alt="Thumbnail"/>
                <div class="badge badge-neutral bg-[#171717] text-white text-xs rounded-md absolute bottom-2 right-1 ${displayBadge}">${hour}hrs ${minute}min ago</div>
            </figure>
            
            <div class="card-body">
                <div class="flex justify-between gap-2">
                    <div>
                        <img class="rounded-full w-14 h-14" src="${
                            singleVideo.authors[0].profile_picture
                        }" alt="Profile" />
                    </div>
                    
                    <div class="space-y-1 flex-1">
                        <h4 class="text-[#171717] font-bold text-sm">${
                            singleVideo.title
                        }</h4>
                        <p>${singleVideo.authors[0].profile_name} ${
            singleVideo?.authors[0]?.verified
                ? `<i class="fa-solid fa-circle-check text-[#2568EF]"></i>`
                : ""
        } </p>
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

// sort by view
const sortByView = () => {};
document
    .getElementById("sort-by-view")
    .addEventListener("click", async function () {
        const res = await fetch(
            `https://openapi.programming-hero.com/api/videos/category/${apiId}`
        );
        const data = await res.json();
        const dataArray = data.data;

        allViews = [];

        dataArray.forEach((views) => {
            videoViews = views?.others?.views;

            viewsInt = parseInt(videoViews.replace("K", ""));

            allViews.push(views);

            allViews.sort(function (a, b) {
                return (
                    parseInt(b?.others?.views.replace("K", "")) -
                    parseInt(a?.others?.views.replace("K", ""))
                );
            });
        });

        displayData(allViews);
    });

loadCategory();
loadData();
