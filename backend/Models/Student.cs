public class Student : User
{
    private int id_Student;
    private int id_User;
    private string dni;
    private string legajo;

    public int IdStudent {get { return id_Student; } set { id_Student = value; }}
    public int IdUser {get { return id_User; } set { id_User = value; }}
    public string Dni {get { return dni; } set { dni = value; }}
    public string Legajo {get { return legajo; } set { legajo = value; }}

  
}