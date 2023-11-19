import paper from "../../public/paper.PNG";
import rock from "../../public/rock.PNG";
import scissors from "../../public/scissors.PNG";

function getRandomGesture() {
    const images = [paper, rock, scissors];

    const random = Math.floor(Math.random() * images.length);
    return images[random];
}

export default getRandomGesture;