const getCategories = async () => {
    const { data } = await axios.get('https://dummyjson.com/products/category-list'); // Fixing the API endpoint
 
return data;
}
const displayCategories = async ()=>{
    const loder =document.querySelector(".loder-container");
    loder.classList.add("active");
    try{
        const categories = await getCategories();
        const result = categories.map((category) => { 
            return `
                <div class="category"> 
                    <h2>${category}</h2> 
                    <a href='categoreisDeatil.html?category=${category}'>Details</a>
                </div>
            `;
        }).join('');
        
        document.querySelector(".categories .row").innerHTML = result;
        loder.classList.remove("active");
    }catch(error){
        document.querySelector(".categories .row").innerHTML ="<p>Error loading categories </p>"
        loder.classList.remove("active");
    }finally{
        loder.classList.remove("active");
    }
    

  
}

const getProducts = async (page) => {
    const skip = (page - 1) * 20; // Corrected calculation for skip
    const { data } = await axios.get(`https://dummyjson.com/products?limit=20&skip=${skip}`);
    return data;
}

const displayProducts = async (page =1) => {
    const loder =document.querySelector(".loder-container");
    loder.classList.add("active");
    
try{
    
    const data = await getProducts(page);
    const numberOfPages = Math.ceil(data.total / 20);
   console.log(page);
    const result = data.products.map((product) => {  
        return `
        <div class="product">
        <img src="${product.thumbnail}" alt ="${product.description}"> 
            <h3>${product.title}</h3> 
            <span>${product.price}</span>
        </div>
        `
    }).join('');
    document.querySelector(".products .row").innerHTML = result;
    loder.classList.remove("active");
        let paginationLinks = ``;
if (page ==1){
  paginationLinks = `
    <li class="page-item">
        <button class="page-link"  >&laquo;</button>
    </li>`;
}else
{
    paginationLinks += `
    <li class="page-item">
        <button class="page-link" onclick="displayProducts(${page -1})" >&raquo;</button>
    </li>`;
}
  

for (let i = 1; i <= numberOfPages; i++) { 
    paginationLinks += `<li class="page-item ${i === page ? 'active' : ''}"><button onclick="displayProducts(${i})" class="page-link">${i}</button></li>`;
}
if (page === numberOfPages) {
    paginationLinks += `
        <li class="page-item">
            <button class="page-link" disabled>&raquo;</button>
        </li>`;
} else {
    paginationLinks += `
        <li class="page-item">
            <button class="page-link" onclick="displayProducts(${parseInt(page) + 1})">&raquo;</button>
        </li>`;
}



    document.querySelector(".pagination").innerHTML = paginationLinks; // Added pagination display logic

}catch(error){
    document.querySelector(".products .row").innerHTML ="<p>Error loading Products </p>"
    loder.classList.remove("active");
}finally{
    loder.classList.remove("active");
}

};

window.onscroll = function() {
    const nav = document.querySelector(".header");
    const categories = document.querySelector(".categories");
    const products = document.querySelector(".products");

    // Check for categories scroll position
    if (window.scrollY > categories.offsetTop) {
        nav.classList.add("scrollNavBar");
    } else {
        nav.classList.remove("scrollNavBar");
    }

    // Check for products scroll position
    if (window.scrollY > products.offsetTop) {
        nav.classList.add("scrollNav");
    } else {
        nav.classList.remove("scrollNav");
    }
};
const countDown = () => {
    const countDownDate = new Date("2025-01-02T00:00:00").getTime();

    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector("#days").textContent = days;
    document.querySelector("#houres").textContent = hours; // Fixed typo
    document.querySelector("#minutes").textContent = minutes;
    document.querySelector("#seconds").textContent = seconds;
};

setInterval(countDown, 1000);





displayCategories ();
displayProducts();