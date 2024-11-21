import { todo } from "node:test";
import { BsBackpackFill, BsCashCoin } from "react-icons/bs";
import {
  FaListUl,
  FaBookOpen,
  FaDumbbell,
  FaSchool,
  FaHeadphones,
  FaCarrot,
} from "react-icons/fa";
import {
  FaRegFaceSmileBeam,
  FaBuildingColumns,
  FaComputer,
} from "react-icons/fa6";
import { IoBookmark } from "react-icons/io5";
import { LuShoppingBasket } from "react-icons/lu";
import { PiForkKnifeFill, PiPillFill } from "react-icons/pi";

const todoIcons = {
  smile: <FaRegFaceSmileBeam />,
  list: <FaListUl />,
  bookmark: <IoBookmark />,
  backpack: <BsBackpackFill />,
  book: <FaBookOpen />,
  cash: <BsCashCoin />,
  workout: <FaDumbbell />,
  food: <PiForkKnifeFill />,
  health: <PiPillFill />,
  school: <FaSchool />,
  government: <FaBuildingColumns />,
  shopping: <LuShoppingBasket />,
  computer: <FaComputer />,
  headphones: <FaHeadphones />,
  carrot: <FaCarrot />,
};
export default todoIcons;
