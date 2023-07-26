const choose = document.querySelector("#choose"),
  img_input = document.querySelector(".img-input"),
  previewImg = document.querySelector(".preview-image img"),
  reset = document.querySelector("#reset"),
  save = document.querySelector("#save"),
  filterBtn = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-value .name"),
  filterValue = document.querySelector(".filter-value .value"),
  filterSlider = document.querySelector(".slider input"),
  rotateBtn = document.querySelectorAll(".rotate button");
let brightness = "100",
  saturation = "100",
  inversion = "0",
  grayscale = "0",
  rotate = 0,
  horizontal = 1,
  vertical = 1;

const loadImg = () => {
  let img = img_input.files[0];
  if (!img) {
    return 0;
  }
  previewImg.src = URL.createObjectURL(img);
  previewImg.addEventListener("load", () => {
    reset.click();
  });
};

filterBtn.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    option.classList.add("active");
    console.log(option);
    filterName.innerText = option.innerText;
    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

const applyFilter = () => {
  console.log(rotate);
  previewImg.style.transform = `rotate(${rotate}deg) scale(${horizontal},${vertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`;
};

rotateBtn.forEach((option) => {
  option.addEventListener("click", () => {
    console.log(option.id);
    if (option.id == "clockwise") {
      rotate = rotate - 90;
    } else if (option.id == "anti") {
      rotate = rotate + 90;
    } else if (option.id == "horizontal") {
      horizontal = horizontal === 1 ? -1 : 1;
    } else {
      vertical = vertical === 1 ? -1 : 1;
    }
    applyFilter();
  });
});

const putFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const filterType = document.querySelector(".filter .active");
  console.log(filterType.id);
  if (filterType.id === "brightness") {
    brightness = filterSlider.value;
  } else if (filterType.id === "inversion") {
    inversion = filterSlider.value;
  } else if (filterType.id === "saturation") {
    saturation = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilter();
};

const resetFilter = () => {
  (brightness = "100"),
    (saturation = "100"),
    (inversion = "0"),
    (grayscale = "0");
  (rotate = 0), (horizontal = 1), (vertical = 1);
  filterBtn[0].click();
  applyFilter();
};

const saveImg = () => {};

img_input.addEventListener("change", loadImg);
choose.addEventListener("click", () => img_input.click());
save.addEventListener("click", saveImg);
filterSlider.addEventListener("input", putFilter);
reset.addEventListener("click", resetFilter);
