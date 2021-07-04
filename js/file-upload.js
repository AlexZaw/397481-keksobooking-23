const avatarPreview = document.querySelector('.ad-form-header__preview');
const phothoPreview = document.querySelector('.ad-form__photo');
const imageTemplate = avatarPreview.querySelector('img');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ImageOption ={
  avatar: {
    alt: 'Аватар пользователя',
    preview: avatarPreview,
  },
  images:{
    alt:'Фото жилья',
    preview: phothoPreview,
  },
};

const uploadImage =(evt) => {
  const target = evt.target;
  const imageSample = imageTemplate.cloneNode(true);
  const file = target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extension) =>fileName.endsWith(extension));
  if(matches){
    const reader = new FileReader();
    reader.addEventListener('load', () =>{
      imageSample.alt = ImageOption[target.id].alt;
      imageSample.src = reader.result;
      ImageOption[target.id].preview.textContent = '';
      ImageOption[target.id].preview.append(imageSample);
    });
    reader.readAsDataURL(file);
  }
};

export { uploadImage };
