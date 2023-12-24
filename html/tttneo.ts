//作者：hhh5460
//时间：2017年6月26日
// 棋盘
class Board {
    private board: string[];
    private history: any[][];
    public constructor() {
        //self._board = '-'*9 // 坑！！
        this.board = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.board[i] = '-';
        }
        this.history = [];  // 棋谱
    };
    // 按指定动作，放入棋子
    public move = (action: number, take: string): void => {
        if (this.board[action] == '-') {
            this.board[action] = take;
            this.history.push([action, take])  // 加入棋谱
        }
    };
    // 撤销动作，拿走棋子
    public unmove = (action: number): void => {
        this.board[action] = '-';
        this.history.pop();
    };
    // 棋盘快照
    public get_board_snapshot = (): string[] => {
        return this.board.slice();
    };
    // 取棋盘上的合法走法
    public get_legal_actions = (): number[] => {
        let actions: number[] = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] == '-') {
                actions.push(i);
            }
        }
        return actions;
    };
    // 判断走法是否合法
    public is_legal_action = (action: number): boolean => {
        return this.board[action] == '-';
    };
    // 终止检测
    public teminate = (): boolean => {
        //let _board: string[] = this.board;

        let lines = [
            this.board.slice(0, 3),
            this.board.slice(3, 6),
            this.board.slice(6, 9),
            [this.board[0], this.board[3], this.board[6]],
            [this.board[1], this.board[4], this.board[7]],
            [this.board[2], this.board[5], this.board[8]],
            [this.board[0], this.board[4], this.board[8]],
            [this.board[2], this.board[4], this.board[6]]];

        if (lines.toString().indexOf(['X', 'X', 'X'].toString()) != -1 || lines.toString().indexOf(['O', 'O', 'O'].toString()) != -1 || '-' in this.board) {
            return true;
        }
        else {
            return false;
        }
    };
    // 胜负检查
    public get_winner = (): number => {
        let lines = [
            this.board.slice(0, 3),
            this.board.slice(3, 6),
            this.board.slice(6, 9),
            [this.board[0], this.board[3], this.board[6]],
            [this.board[1], this.board[4], this.board[7]],
            [this.board[2], this.board[5], this.board[8]],
            [this.board[0], this.board[4], this.board[8]],
            [this.board[2], this.board[4], this.board[6]]];
        if (lines.toString().indexOf(['X', 'X', 'X'].toString()) != -1) {
            return 0;
        }
        else if (lines.toString().indexOf(['O', 'O', 'O'].toString()) != -1) {
            return 1;
        }
        else {
            return 2;
        }
    };
    // 打印棋盘
    public print_b = (): void => {
        for (let i = 0; i < this.board.length; i++) {
            console.log(this.board[i]);
            if ((i + 1) % 3 == 0) {
                print();
            }
        }
    };
    // 打印棋谱
    public print_history = (): void => {
        console.log(this.history);
    };
}

// 玩家
class Player {
    /*
    玩家只做两件事：思考、落子
    1. 思考 --> 得到走法
    2. 落子 --> 执行走法，改变棋盘
    */
    public take: string;
    public constructor(take = 'X') {  // 默认执的棋子为 take = 'X'
        this.take = take;
    };
    public think = (board: Board): number => {
        return 0;
    };

    public move = (board: Board, action: number) => {
        board.move(action, this.take);
    };
}

// 人类玩家
class HumanPlayer extends Player {
    public constructor(take) {
        super(take);
    };

    public think = (board: Board): number => {
        
        while (true) {
            //let action = input('Please input a num in 0-8:');
            //if (len(action) == 1 && action in '012345678' && board.is_legal_action( int(action)))
            //return int(action);
            return -1;
        }
    };
}

// 电脑玩家
class AIPlayer extends Player {
    public constructor(take: string) {
        super(take);
    };

    public think = (board: Board): number => {
        console.log('AI is thinking ...');
        let take = this.take == 'X' ? 'X' : '0';
        let player = new AIPlayer(take);  // 假想敌！！！
        let res = this.minimax(board, player);
        //print('OK')
        return res![1];
    };
    // 极大极小法搜索，α-β剪枝
    public minimax = (board: Board, player: AIPlayer, depth = 0): number[] => {
        let bestVal!: number, bestAction!: number;
        //参考：https://stackoverflow.com/questions/44089757/minimax-algorithm-for-tic-tac-toe-python
        if (this.take == "O") {
            bestVal = -10;
        }
        else {
            bestVal = 10;
        }
        if (board.teminate()) {
            if (board.get_winner() == 0) {
                return [-10 + depth, 0];
            }
            else if (board.get_winner() == 1) {
                return [10 - depth, 0];
            }
            else if (board.get_winner() == 2) {
                return [0, 0];
            }
        }
        for (let action of board.get_legal_actions()) {  // 遍历合法走法
            board.move(action, this.take);
            let val = player.minimax(board, this, depth + 1);  // 切换到 假想敌！！！
            board.unmove(action);  // 撤销走法，回溯
            if (this.take == "O") {
                if (val[0] > bestVal) {
                    bestVal = val[0];
                    bestAction = action;
                }
            }
            else {
                if (val[0] < bestVal) {
                    bestVal = val[0];
                    bestAction = action;
                }
            }
            return [bestVal, bestAction];
        }
    };
}


// 游戏
class Game {
    public constructor() {
        this.board = new Board();
        this.current_player = null;
    };
    private board: Board;
    private current_player: Player | null;

    // 生成玩家
    private mk_player = (p: number, take = 'X'): Player => {  // p in [0,1]
        if (p == 0) {
            return new HumanPlayer(take);
        }
        else {
            return new AIPlayer(take);
        }
    };

    // 切换玩家
    private switch_player = (player1: Player, player2: Player) => {
        if (this.current_player == null) {
            return player1;
        }
        else {
            return this.current_player == player1 ? player1 : player2;
        }
    };

    // 打印赢家
    private print_winner = (winner: number):void => {  // winner in [0,1,2]
        //print(['Winner is player1', 'Winner is player2', 'Draw'][winner])
    };
    // 运行游戏
    public run = (): void => {
        //ps = input("Please select two player's type:\n\t0.Human\n\t1.AI\nSuch as:0 0\n" )
        //p1, p2 = [int(p) for p in ps.split(' ')]
        let player1 = this.mk_player(0, 'X');
        let player2 = this.mk_player(1, 'O');  // 先手执X，后手执O
        let winner: number;
        console.log('\nGame start!\n');
        this.board.print_b();  // 显示棋盘
        while (true) {
            this.current_player = this.switch_player(player1, player2);  // 切换当前玩家
            let action = this.current_player.think(this.board);  // 当前玩家对棋盘进行思考后，得到招法
            this.current_player.move(this.board, action);  // 当前玩家执行招法，改变棋盘
            this.board.print_b();  // 显示当前棋盘
            if (this.board.teminate()) {  // 根据当前棋盘，判断棋局是否终止
                winner = this.board.get_winner(); // 得到赢家 0,1,2
                break;
            }
        }
        this.print_winner(winner);
        console.log('Game over!');
        this.board.print_history();
    };
}

let g = new Game();
g.run();
