using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace Lab1DBMS
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string conString = "Data Source=DESKTOP-D7HM0FA\\SQLEXPRESS;" + 
                "Initial Catalog=Music_Production_Company;Integrated Security=true;";
            SqlConnection con = new SqlConnection(conString);
            con.Open();
            string strSong = "SELECT * FROM Song";
            SqlCommand cmd = new SqlCommand(strSong, con);

            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    Console.WriteLine("{0}, {1}", reader[0], reader[1]);
                }
            }
            con.Close();
            //press control f5 to keep the console more
        }
    }
}
