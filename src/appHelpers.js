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
    isHiddenFromFriends,
  } = postInfo;

  const postInfoFB = {
    title,
    body: description,
    price,
    imagePaths,
    location: locationFB,
    category: categoryFB,
    condition: conditionFB,
    isHiddenFromFriends,
  };

  await window.electronAPI.createNewPostingFB(postInfoFB);
};

const relistActivePostingsCL = async (priceDrop) => window.electronAPI.relistActivePostingsCL(priceDrop);

const relistActivePostingsFB = async (priceDrop) => window.electronAPI.relistActivePostingsFB(priceDrop);

export const createNewPosting = async (postInfo, selectedApp) => {
  let resp;

  switch (selectedApp) {
    case 'cl':
      resp = await createNewPostingCL(postInfo);
      break;
    case 'fbm':
      resp = await createNewPostingFB(postInfo);
      break;
    case 'both':
      resp = await Promise.all([
        createNewPostingCL(postInfo),
        createNewPostingFB(postInfo),
      ]);
      break;
  }

  return resp;
};

export const relistActivePostings = async (priceDrop, selectedApp) => {
  let resp;

  console.log('inside relist');
  switch (selectedApp) {
    case 'cl':
      resp = await relistActivePostingsCL(priceDrop);
      break;
    case 'fbm':
      resp = await relistActivePostingsFB(priceDrop);
      break;
    case 'both':
      resp = await Promise.all([
        relistActivePostingsCL(priceDrop),
        relistActivePostingsFB(priceDrop),
      ]);
      break;
  }

  return resp;
};
