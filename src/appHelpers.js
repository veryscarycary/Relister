const createNewPostingCL = async (postInfo) => {
  const {
    title,
    description,
    price,
    locationCL,
    categoryCL,
    conditionCL,
    imagePaths,
    manufacturer,
    name,
    neighborhood,
    phoneNumber,
    zipCode,
  } = postInfo;

  const postInfoCL = {
    title,
    body: description,
    price,
    imagePaths,
    location: locationCL,
    category: categoryCL,
    condition: conditionCL,
    manufacturer,
    name,
    neighborhood,
    phoneNumber,
    zipCode,
  };

  await window.electronAPI.createNewPostingCL(postInfoCL);
};

const createNewPostingFB = async (postInfo) => {
  const {
    title,
    description,
    price,
    locationFB,
    imagePaths,
    categoryFB,
    conditionFB,
  } = postInfo;

  const postInfoFB = {
    title,
    body: description,
    price,
    imagePaths,
    location: locationFB,
    category: categoryFB,
    condition: conditionFB,
  };

  await window.electronAPI.createNewPostingFB(postInfoFB);
};

const relistActivePostingsCL = async (priceDrop) => {
  await window.electronAPI.relistActivePostingsCL(priceDrop);
};

const relistActivePostingsFB = async (priceDrop) => {
  await window.electronAPI.relistActivePostingsFB(priceDrop);
};

export const createNewPosting = async (postInfo, selectedApp) => {
  switch (selectedApp) {
    case 'cl':
      await createNewPostingCL(postInfo);
      break;
    case 'fbm':
      await createNewPostingFB(postInfo);
      break;
    case 'both':
      await Promise.all([
        createNewPostingCL(postInfo),
        createNewPostingFB(postInfo),
      ]);
      break;
  }
};

export const relistActivePostings = async (priceDrop, selectedApp) => {
  switch (selectedApp) {
    case 'cl':
      await relistActivePostingsCL(priceDrop);
      break;
    case 'fbm':
      await relistActivePostingsFB(priceDrop);
      break;
    case 'both':
      await Promise.all([
        relistActivePostingsCL(priceDrop),
        relistActivePostingsFB(priceDrop),
      ]);
      break;
  }
};
