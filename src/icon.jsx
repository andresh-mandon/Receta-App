import { 
    FaHamburger,
    FaPizzaSlice,
    FaCarrot,

 } from "react-icons/fa";
import {
    GiChickenLeg,
    GiCupcake,
    GiMeat,
    GiNoodles,
    GiPig,
    GiSlicedBread,
    GiFriedEggs,
    GiGoat,

    } from "react-icons/gi";

    import { 
        TbSoupFilled,
        TbDeviceUnknownFilled
     } from "react-icons/tb";

    import { 
        LuVegan 
    } from "react-icons/lu";

    import { FaShrimp } from "react-icons/fa6";


export const categoryIcons = {
  Beef: <FaHamburger />,
  Chicken: <GiChickenLeg />,
  Dessert: <GiCupcake />,
  Pasta: <GiNoodles />,
  Seafood: <FaShrimp />,
  Lamb: <GiMeat />,
  Vegan: <LuVegan />,
  Vegetarian: <FaCarrot />,
  Side: <GiSlicedBread />,
  Starter: <TbSoupFilled />,
  Miscellaneous: <FaPizzaSlice />,
  Breakfast: <GiFriedEggs />,
  Pork: <GiPig />,
  Goat: <GiGoat />,
  Unknown: <TbDeviceUnknownFilled />,
};

export default categoryIcons;