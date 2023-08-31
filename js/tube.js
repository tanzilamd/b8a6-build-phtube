// Load Categories Name
const loadCategory = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();

    const categoryArray = data.data;

    displayCategory(data.data);
};

// Display categories with btn
const displayCategory = (categoryArray) => {
    categoryArray.forEach((category) => {
        const categoryName = category.category;

        // console.log(categoryElement);
        const CategoryBtnContainer = document.getElementById(
            "category-btn-container"
        );
        const newBtn = document.createElement("button");
        newBtn.classList =
            "btn btn-info bg-[#25252533] hover:bg-[#25252533] border-none";
        newBtn.innerText = categoryName;

        CategoryBtnContainer.appendChild(newBtn);
    });
};

loadCategory();
