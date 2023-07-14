export interface PostInfoBase {
  body: string;
  category: string;
  condition?: string;
  imagePaths: string[];
  location: string;
  price: string;
  title: string;
}

export interface PostInfoCL extends PostInfoBase {
  manufacturer?: string;
  name: string;
  neighborhood: string;
  phoneNumber: string;
  zipCode: string;
}

export interface PostInfoFB extends PostInfoBase {
  condition: string;
  isHiddenFromFriends?: boolean;
}
