export interface Block {
  title: string;
  text: string;
}

export interface List {
  title: string;
  items: string[];
}

export interface BottomCard {
  title: string;
  rate: number;
  pic: string;
  bonus: string;
  link: string;
}

export interface Data {
  mainTitle: string;
  title: string;
  rate: number;
  pic: string;
  bonus: string;
  link: string;
  blocks: Block[];
  lists: List[];
  bottomCard: BottomCard;
}


