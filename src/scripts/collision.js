import { Obstacle } from './obstacle';
import { DirectionEnum } from "./utility";
import { Enemy } from './enemy';

export class SpriteCollisionFlags {
    constructor() {
        this.obstacleCollision = false;
        this.direction = DirectionEnum.none;
    }
}
export class Collision {
    constructor() {
        this.heroEnemyCollision = false;
    }

    detectCollision(obj1, obj2) {
        let bp1 = obj1.sprite.borderPoints;
        let bp2 = null;
        if (obj2 instanceof Enemy) {
            bp2 = obj2.sprite.borderPoints;
        } else {
            bp2 = obj2.borderPoints;
        }
        if (bp1.x_left)
            switch (obj1.direction) {
                case DirectionEnum.left:
                    if ((bp1.x_left <= bp2.x_right && bp1.x_left >= bp2.x_left) &&
                        ((bp1.y_up >= bp2.y_up && bp1.y_up <= bp2.y_down) ||
                            (bp1.y_down <= bp2.y_down && bp1.y_down >= bp2.y_up))) {
                        return true;
                    }
                    return false;
                case DirectionEnum.right:
                    if ((bp1.x_right >= bp2.x_left && bp1.x_right <= bp2.x_right) &&
                        ((bp1.y_up >= bp2.y_up && bp1.y_up <= bp2.y_down) ||
                            (bp1.y_down <= bp2.y_down && bp1.y_down >= bp2.y_up))) {
                        return true;
                    }
                    return false;
                case DirectionEnum.down:
                    if ((bp1.y_down >= bp2.y_up && bp1.y_down <= bp2.y_down) &&
                        ((bp1.x_left >= bp2.x_left && bp1.x_left <= bp2.x_right) ||
                            (bp1.x_right <= bp2.x_right && bp1.x_right >= bp2.x_left))) {
                        return true;
                    }
                    return false;
                case DirectionEnum.up:
                    if ((bp1.y_up <= bp2.y_down && bp1.y_up >= bp2.y_up) &&
                        ((bp1.x_left >= bp2.x_left && bp1.x_left <= bp2.x_right) ||
                            (bp1.x_right <= bp2.x_right && bp1.x_right >= bp2.x_left))) {
                        return true;
                    }
                    return false;
                default:
                    return false;
            }
        return false;
    }

    detectHeroEnemyCollision(hero, enemiesArray) {
        for (let i = 0; i < enemiesArray.length; i++) {
            if (!this.heroEnemyCollision) {
                this.heroEnemyCollision = this.detectCollision(hero, enemiesArray[i]);
            }
            else { break; }
        }
    }

    detectObstacleCollision(object, obstacleArray) {
        for (let i = 0; i < obstacleArray.length; i++) {
            if (obstacleArray[i] instanceof Obstacle && obstacleArray[i].isCollisionActive) {
                if (!object.spriteCollisionFlags.obstacleCollision) {
                    object.spriteCollisionFlags.obstacleCollision = this.detectCollision(object, obstacleArray[i]);
                }
                else { break; }
            }
        }
    }
}
