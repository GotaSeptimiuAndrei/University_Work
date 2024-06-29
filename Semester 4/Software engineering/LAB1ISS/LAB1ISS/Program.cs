using System;
using System.Collections.Generic;

class LAB1
{

    static bool isinRange(int[,] board)
    {

        for (int i = 0; i < 9; i++)
        {
            for (int j = 0; j < 9; j++)
            {
                if (board[i, j] <= 0 ||
                    board[i, j] > 9)
                {
                    return false;
                }
            }
        }
        return true;
    }

    static bool isValidSudoku(int[,] board)
    {

        // Check if all elements of board[][]
        // stores value in the range[1, 9]
        if (isinRange(board) == false)
        {
            return false;
        }

        bool[] unique = new bool[10];

        // Traverse each row 
        for (int i = 0; i < 9; i++)
        {
            Array.Fill(unique, false);

            // Traverse each column
            // of current row
            for (int j = 0; j < 9; j++)
            {

                int cell = board[i, j];

                // Check if current row
                // stores duplicate value
                if (unique[cell])
                {
                    return false;
                }
                unique[cell] = true;
            }
        }

        // Traverse each column
        for (int i = 0; i < 9; i++)
        {
            Array.Fill(unique, false);

            // Traverse each row
            // of current column
            for (int j = 0; j < 9; j++)
            {
                int cell = board[j, i];

                // Check if current column
                // stores duplicate value
                if (unique[cell])
                {
                    return false;
                }
                unique[cell] = true;
            }
        }

        // Traverse each block of
        // size 3 * 3 in board[][] array
        for (int i = 0; i < 7; i += 3)
        {
            // j stores first column of
            // each 3 * 3 board
            for (int j = 0; j < 7; j += 3)
            {
                Array.Fill(unique, false);

                // Traverse current 3 * 3 board
                for (int k = 0; k < 3; k++)
                {
                    for (int l = 0; l < 3; l++)
                    {
                        int currRow = i + k;

                        int currCol = j + l;

                
                        int cell = board[currRow, currCol];

                        // Check if current block
                        // stores duplicate value
                        if (unique[cell])
                        {
                            return false;
                        }
                        unique[cell] = true;
                    }
                }
            }
        }

        return true;
    }

    public static void Main()
    {
        int[,] board = new int[9, 9];

        //for (int i = 0; i < 9; i++)
        //{
        //    for (int j = 0; j < 9; j++) 
        //    {
        //        board[i, j] = Convert.ToInt32(Console.ReadLine());
        //    }
        //}

        int[,] board2 = {{7, 9, 2, 1, 5, 4, 3, 8, 6},
             {6, 4, 3, 8, 2, 7, 1, 5, 9},
             {8, 5, 1, 3, 9, 6, 7, 2, 4},
             {2, 6, 5, 9, 7, 3, 8, 4, 1},
             {4, 8, 9, 5, 6, 1, 2, 7, 3},
             {3, 1, 7, 4, 8, 2, 9, 6, 5},
             {1, 3, 6, 7, 4, 8, 5, 9, 2},
             {9, 7, 4, 2, 1, 5, 6, 3, 8},
             {5, 2, 8, 6, 3, 9, 4, 1, 7}};

        int[,] board3 = {{5, 5, 5, 5, 5, 5, 5, 5, 5},
             {5, 5, 5, 5, 5, 5, 5, 5, 5},
             {5, 5, 5, 5, 5, 5, 5, 5, 5},
             {5, 5, 5, 5, 5, 5, 5, 5, 5},
             {5, 5, 5, 5, 5, 5, 5, 5, 5},
             {5, 5, 5, 5, 5, 5, 5, 5, 5},
             {5, 5, 5, 5, 5, 5, 5, 5, 5},
             {5, 5, 5, 5, 5, 5, 5, 5, 5},
             {5, 5, 5, 5, 5, 5, 5, 5, 5}};

        if (isValidSudoku(board3))
        {
            Console.WriteLine("Valid");
        }
        else
        {
            Console.WriteLine("Not Valid");
        }
    }
}
