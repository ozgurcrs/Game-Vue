new Vue({

    el:"#app",

    data:
    {   
        playerHealt:100,
        enemyHealt:100,
        game_is_on:false,
        logs: []
    },
    
    methods:
    {
        startGame:function()
        {
            this.game_is_on = true;
        },

        randomAttackSize:function(attackSize)
        {
            return Math.floor(Math.random() *10 *attackSize);
        },

        attackPlayer:function()
        {
            var attackSize = this.randomAttackSize(1);
            this.enemyHealt-=attackSize;
            this.attackEnemy();
            this.logs.push({id:"p",attackSize:"Player "+attackSize+" attack"});
            
        },

        attackEnemy:function()
        {
            var attackSize =  this.randomAttackSize(1.5);
            this.playerHealt -= attackSize;
            this.logs.push({id:"e",attackSize:"Enemy "+attackSize+" attack"});
        },

        specialAttack:function()
        {
            var attackSize = this.randomAttackSize(2);
            this.enemyHealt-=attackSize;
            this.attackEnemy();
            this.logs.push({id:"p",attackSize:"Player "+attackSize+" attack"});
        },

        medic:function()
        {
            var medic =this.randomAttackSize(2);
            this.playerHealt += medic;
            this.attackEnemy();
            this.logs.push({id:"p",attackSize:"Player "+medic+" healt up"});
        },

        giveUp:function()
        {
            this.playerHealt=0;
        }
    },

    watch:
    {
        playerHealt:function()
        {
            if(this.playerHealt <=0)
            {
                this.playerHealt = 0;
                if(confirm("Kaybettin Tekrar oynamak ister misin ?"))
                    {this.playerHealt = 100; this.enemyHealt = 100; this.logs = []}
            }
            else if(this.playerHealt >100)
                    this.playerHealt=100;         
        },

        enemyHealt:function()
        {
            if(this.enemyHealt <=0)
            {
                this.enemyHealt = 0;
                if(confirm("Kazandın Tekrar oynamak ister misin ?"))
                    {this.playerHealt = 100; this.enemyHealt = 100; this.logs = []}
            }
            
        }
    }
});