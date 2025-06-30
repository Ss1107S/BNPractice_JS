let SlideShow2 = {
    images: ["../logo.png", "img1.jpg", "img2.jpg"],
    index: 0,
    //create array of images
    addImage(src) {

    },

    addDots(){
    //forEach method for render each image with every index of dot (+1 index)

    },
    
    Vision(){
    //function for moving images with if else loop
    },

    toNext(){
    //function for moving next image with button go inside array +1 used function Vision and index++

    },

    toPrevious(){
    //function for moving previous image with button go back inside array to -1 used function Vision
    //and used index--

    }
}
    //===============================================
let SlideShow = {
    images: ["1.jpg", "2.jpg", "3.jpg"],
    index: 0,
    addImage(src) {
        this.images.push(src);
        this.addDots();
    },
    addDots(){
    const dotsContainer = document.querySelector(".dots");
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    this.images.forEach((imageSrc, index) => {
        const dotElement = document.createElement("span");

        if (index === this.index) {
            dotElement.className = "dot active";
        } else {
            dotElement.className = "dot";
        }

        dotElement.addEventListener("click", () => {
            this.index = index;
            this.Vision();
        });

        dotsContainer.appendChild(dotElement);
        });
    },
   
    Vision(){
        const imageElement = document.querySelector(".img");
    if (!imageElement) return;

    imageElement.classList.add("fade-out");

    setTimeout(() => {
        imageElement.src = this.images[this.index];
        imageElement.classList.remove("fade-out");
    }, 300); 

    this.addDots();
    },
    toNext(){
        this.index = (this.index + 1) % this.images.length;
        this.Vision();
    },

    toPrevious(){
    this.index = (this.index - 1 + this.images.length) % this.images.length;
    this.Vision();
    },

    init() {
    document.querySelector(".next").addEventListener("click", () => this.toNext());
    document.querySelector(".previous").addEventListener("click", () => this.toPrevious());
    this.Vision();
    }
};
SlideShow.init();