import {
    _decorator,
    Component,
    Node,
    Vec2,
    Vec3,
    UITransform,
    Enum,
    Input,
    Quat,
    lerp,
    tween,
    TweenAction,
    Sprite,
    SpriteFrame,
    instantiate,
    loader,
    url,
    resources
} from "cc";
const { ccclass, property } = _decorator;

enum DIRECTION {
    NONE = 0,
    TOP = 1,
    BOTTOM = 2,
    LEFT = 3,
    RIGHT = 4,
}

@ccclass("moveObjScript")
export class moveObjScript extends Component {

    @property({ type: Enum(DIRECTION) })
    buttonType = DIRECTION.NONE;

    @property(Node)
    myImage: Node = null;


    frame: number = 0;
    maxFrame: number = 90;
    deltaTime: number;


    onLoad() {
        console.log("This is OnLoad()!");
        this.deltaTime = 0;
        this.node.on(
            Input.EventType.TOUCH_START,
            () => {
                this.schedule(this.move, 0.1);
            },
            this
        );
        this.node.on(Input.EventType.TOUCH_END, () => {
            this.unschedule(this.move);
        });
    }

    start() {
        console.log("This is onStart()");
    }



    update(dt: number) {
        this.deltaTime = dt;
        console.log("Updatae()");
    }



    // Deciding In which direction character should move
    move() {
        switch (this.buttonType) {
            case DIRECTION.TOP: {
                this.moveUp();
                break;
            }

            case DIRECTION.BOTTOM: {
                this.moveDown();
                break;
            }

            case DIRECTION.LEFT: {
                this.moveLeft();
                break;
            }

            case DIRECTION.RIGHT: {
                this.moveRight();
                break;
            }
        }
    }



    // Code: Smooth motion of object

    // ********************************************************************************** \\
    getNodePos(myNode) {
        let pos: Vec3 = myNode.getPosition();
        return pos;
    }
    getNodeParentPos(myNode) {
        let parPos: Vec3 = myNode.parent.getPosition();
        return parPos;
    }
    getNodeSize(myNode) {
        return myNode.getComponent(UITransform).contentSize;
    }
    // **********************************************************************************\\



    moveUp() {
        let oldPosOfImg: Vec3 = this.getNodePos(this.myImage);
        let heightOfImg = this.getNodeSize(this.myImage).height;
        let canvasPos: Vec3 = this.getNodeParentPos(this.myImage);

        console.log(`Current pos ${oldPosOfImg}`);
        console.log(`Canvas Pos: ${canvasPos}`);
        console.log(`height of Img: ${heightOfImg}`);


        // const url = '/test_assets/test_atlas/sprites/backgroundImg';
        // resources.load(url, SpriteFrame, (err: any, spriteFrame) => {
        //     const sprite = this.node.parent.getComponent(Sprite);
        //     console.log(sprite);
        //     sprite.spriteFrame = spriteFrame;
        //     console.log("img loaded: " + sprite.spriteFrame);
        // });

        if (oldPosOfImg.y + 50 < (canvasPos.y - (heightOfImg / 2) )) {
            tween(this.myImage)
                .to(0.3, { position: new Vec3(oldPosOfImg.x, oldPosOfImg.y+50, oldPosOfImg.z)})
                .start()
        }

        console.log(`New pos ${oldPosOfImg}`);

    }

    moveDown() {
        let oldPosOfImg: Vec3 = this.getNodePos(this.myImage);
        let heightOfImg = this.getNodeSize(this.myImage).height;
        let canvasPos: Vec3 = this.getNodeParentPos(this.myImage);

        console.log(`Current pos ${oldPosOfImg}`);
        console.log(`Canvas Pos: ${canvasPos}`);
        console.log(`height of Img: ${heightOfImg}`);

        if (oldPosOfImg.y - 50 >= -(canvasPos.y - (heightOfImg / 2) + 5)) {

            tween(this.myImage)
                .to(0.3, { position: new Vec3(oldPosOfImg.x, oldPosOfImg.y-50, oldPosOfImg.z)})
                .start()
        }
        console.log(`New pos ${oldPosOfImg}`);
    }

    moveRight() {
        let oldPosOfImg: Vec3 = this.getNodePos(this.myImage);
        let widthOfImg = this.getNodeSize(this.myImage).width;
        let canvasPos: Vec3 = this.getNodeParentPos(this.myImage);

        console.log(`Current pos ${oldPosOfImg}`);
        console.log(`Canvas Pos: ${canvasPos}`);
        console.log(`height of Img: ${widthOfImg}`);


        if (oldPosOfImg.x + 50 <= (canvasPos.x - (widthOfImg / 2) )) {

            tween(this.myImage)
                .to(0.3, { position: new Vec3(oldPosOfImg.x + 50, oldPosOfImg.y, oldPosOfImg.z) })
                .start()

            }
            console.log(`New pos ${oldPosOfImg}`);
        }
        
        moveLeft() {
            let oldPosOfImg: Vec3 = this.getNodePos(this.myImage);
            let widthOfImg = this.getNodeSize(this.myImage).width;
            let canvasPos: Vec3 = this.getNodeParentPos(this.myImage);
            
            console.log(`Current pos ${oldPosOfImg}`);
            console.log(`Canvas Pos: ${canvasPos}`);
            console.log(`height of Img: ${widthOfImg}`);
            
            if (oldPosOfImg.x - 10 > -(canvasPos.x - (widthOfImg / 2))) {
                oldPosOfImg.x -= 10;
                this.myImage.setPosition(oldPosOfImg);
            }
            console.log(`New pos ${oldPosOfImg}`);
    }


}


  // Ends Here