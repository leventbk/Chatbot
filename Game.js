const GameState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SELECTION:  Symbol("Selection"),
    PLAY:  Symbol("Story"),
    STORYCONTINUE:  Symbol("SHC"),
    FEEDBACK: Symbol("FB"),
    FINAL: Symbol("L"),
    AREYOUSURE: Symbol('AYS'),
    SECONDSTORY: Symbol ('SS')

});

export default class Game{

    constructor(){
        this.stateCur = GameState.WELCOMING;
        this.story_type= "";
    }
    
    makeAMove(sInput)
    {
        let sReply = "Hi stranger! I'm a story teller bot. Do you want to listen a short story? yes?";

        switch(this.stateCur){
            case GameState.WELCOMING:
                this.stateCur = GameState.SELECTION;
                break;
            case GameState.SELECTION:
                if(sInput.toLowerCase().match("yes")){
                    sReply = "Would you like to listen a short 'horror' or 'funny' story?";
                    this.stateCur = GameState.PLAY;                
                }else if ((sInput.toLowerCase().match("no"))){
                    sReply = "But you will miss a story. Are you really sure?";
                    this.stateCur = GameState.AREYOUSURE; 
                }else{
                    sReply = "Sorry, I cannot understand your answer! Would you like to listen a short story?";
                    this.stateCur = GameState.SELECTION; 
                }
                break;
            case GameState.AREYOUSURE:
                if(sInput.toLowerCase().match("yes")){
                    sReply = "I am sorry to hear that :( Have nice Holloween! Do you want to give me feedback?";
                    this.stateCur = GameState.FEEDBACK;                
                }else if (sInput.toLowerCase().match("no")){
                    sReply = "Would you like to listen a short 'horror' or 'funny' story?";
                    this.stateCur = GameState.PLAY;  
                }else{
                    sReply = "Sorry, I cannot understand your answer! Are you sure you do not want to listen a story?";
                    this.stateCur = GameState.AREYOUSURE; 
                }
                break;
            case GameState.FEEDBACK:
                if(sInput.toLowerCase().match("yes")){
                    sReply="Do you liked the Storyteller bot? 'yes' or 'no'";
                    this.stateCur = GameState.FINAL;
                }else if (sInput.toLowerCase().match("no")){
                    sReply="Oh okay, no problem! Thank you to speak with me today! Have a nice holloween!";
                }else{
                    sReply ="Sorry, I cannot understand your answer!";
                    this.stateCur = GameState.FEEDBACK;
                }
                break;
            case GameState.PLAY:
                if(sInput.toLowerCase().match("horror")){
                    this.story_type="h";
                    sReply = "When my sister Betsy and I were kids, our family lived for awhile in a charming old farmhouse. We loved exploring its dusty corners and climbing the apple tree in the backyard. But our favorite thing was the ghost. We called her Mother, because she seemed so kind and nurturing. Some mornings Betsy and I would wake up, and on each of our nightstands, we’d find a cup that hadn’t been there the night before. Mother had left them there, worried that we’d get thirsty during the night. She just wanted to take care of us. Among the homes’ original furnishings was an antique wooden chair which we kept against the back wall of the living room. ... \n \n HEY! If you like to read the rest of the short story, you should just say 'Continue' (Story from https://bit.ly/2MLomvi). ";
                    this.stateCur =GameState.STORYCONTINUE;
                } else if (sInput.toLowerCase().match("funny")){
                    this.story_type="f";
                    sReply = "Because of a guest, we have a confirmed ghost story. My husband and I both experienced the same 'feeling' and vision while outside working the orchard and blueberries -- the funny part is I didn't tell him about it when it happened (mine happened first and I didn't tell him, then his occurred some months later and he came in and told me). My husband came in one day (about a month or so after I had my experience) and told me of his experience. Same man, same 'watchful' feeling. We both 'saw' this figure in our side vision -- a man watching us as we worked. ... \n \n HEY! If you like to read the rest of the short story, you should just say 'Continue' (Story from https://bit.ly/2DQXeZ8).";
                    this.stateCur =GameState.STORYCONTINUE;
                }else{
                    sReply="Sorry, I cannot understand your answer! Would you like to listen a short 'horror' or 'funny' story?";
                    this.stateCur =GameState.PLAY;
                }
                break;
            case GameState.STORYCONTINUE: 
                if(sInput.toLowerCase().match("continue") && this.story_type=="h"){
                    sReply ="...Whenever we were preoccupied, watching TV or playing a game, Mother would inch that chair forward, across the room, toward us. Sometimes she’d manage to move it all the way to the centre of the room. We always felt sad putting it back against the wall. Mother just wanted to be near us. Years later, long after we’d moved out, I found an old newspaper article about the farmhouse’s original occupant, a widow. She’d murdered her two children by giving them each a cup of poisoned milk before bed. Then she hung herself. The article included a photo of the farmhouse’s living room, with a woman’s body hanging from a beam. Beneath her, knocked over, was that old wooden chair, placed exactly in the center of the room. \n \n HEY! If you want to listen another horror story say 'yes'!" ;
                    this.stateCur = GameState.SECONDSTORY;
                }else if (sInput.toLowerCase().match("continue") && this.story_type=="f"){
                    sReply ="...It also was a 'feeling' of this voice telling us where to prune, how to do the job we were doing. A 'guiding spirit,' we call him. We found out later that it was Old Man Simon. How did we find out? We described this man to a guest (a relative of the Brewsters, who owned the property before us) that brought pictures of Simon. She showed us the picture only after we described him. It was one of the original owners of this 260-year-old home! \n \n HEY! If you want to listen another funny story say 'yes'!" ;
                    this.stateCur = GameState.SECONDSTORY;
                }else if (sInput.toLowerCase().match("no") && this.story_type=="h"){
                    sReply ="oh, I am sorry to hear that. Anyway, If you like the short story, you can read rest of it from the link https://www.hauntedrooms.co.uk/5-short-true-ghost-stories under story 4. Happy Halloween!!! Do you want to give me feedback? ";
                    this.stateCur = GameState.FEEDBACK;
                }else if (sInput.toLowerCase().match("no") && this.story_type=="f"){
                    sReply ="oh, I am sorry to hear that. Anyway, If you like the short story, you can read rest of it from the link http://www.guy-sports.com/humor/jokes/jokes_ghost_car.htm under 'Ghostly Story by Kate Bauer [Innkeeper]'. Happy Halloween!!! Do you want to give me feedback?";
                    this.stateCur = GameState.FEEDBACK;
                }else{
                    sReply ="Sorry, I cannot understand your answer! HEY! If you like to read the rest of the short story, you should just say 'Continue'.";
                    this.stateCur =GameState.STORYCONTINUE;
                }
                break;
                case GameState.SECONDSTORY: 
                    if (sInput.toLowerCase().match("yes") && this.story_type=="h"){
                        sReply ="Mommy told me never to go in the basement, but I wanted to see what was making that noise. It kind of sounded like a puppy, and I wanted to see the puppy, so I opened the basement door and tiptoed down a bit. I didn’t see a puppy, and then Mommy yanked me out of the basement and yelled at me. Mommy had never yelled at me before, and it made me sad and I cried. Then Mommy told me never to go into the basement again, and she gave me a cookie. That made me feel better, so I didn’t ask her why the boy in the basement was making noises like a puppy, or why he had no hands or feet. Would you like to give a feedback? 'yes' or 'no'";
                        this.stateCur = GameState.FEEDBACK;
                    }else if (sInput.toLowerCase().match("yes") && this.story_type=="f"){
                        sReply ="One dark, windy night, just outside Doncaster in Yorkshire, England, Neil, the town drunk was meandering his way home after the pub had closed. Somehow Neil got turned around and ended up walking through the graveyard in St Mary's church instead of taking the Tadcaster road home. The wind howled louder and Neil thought he could hear a voice calling his name. Suddenly, the ground opened up in front of him, and he fell down, down into an open grave. He could still hear the voice clearer and louder now, calling to him. Neil knew it was Satan , coming for him just like the vicar had said, on account of him being the town drunk. The hole was very deep and inside it was pitch black. His eyes adjusted to the darkness and after a few moments, and he made out a form sitting in the darkness with him. It called his name, and he scrambled away in fear, trying to climb out of that terrible grave. Then the figure spoke to him, 'You can't get out,' it moaned. Neil gave a shout of pure terror and leapt straight up in the air, caught the edge of the hole in his hands, and scrambling out for his very life, he ran for home as fast as he could go. Inside the open grave, his neighbour Tony sighed in resignation. He, too, had fallen into the hole a few minutes before his friend and had thought that together they might help each other climb out.  Now he was going to have to wait until morning and get the gravedigger to bring him a ladder. Would you like to give a feedback? 'yes' or 'no'";
                        this.stateCur = GameState.FEEDBACK;
                    }else if(sInput.toLowerCase().match("no")){
                        sReply = "I am sorry to hear that :( Have nice Holloween! Do you want to give me feedback?";
                        this.stateCur = GameState.FEEDBACK;  
                    }else{
                        sReply ="Sorry, I cannot understand your answer! HEY! If you want to listen another story say 'yes'!";
                        this.stateCur = GameState.SECONDSTORY;  
                    }
                    break;
            case GameState.FINAL:
                sReply="Thank you to speak with me today! Have a nice holloween!";               
        }
        return(sReply);        
    }
}
