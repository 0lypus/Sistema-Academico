public class Role
{
    private int id_rol;
    private string name;
    public int Id {get {return id_rol;} set {id_rol = value;}}
    public string Name {get {return name;} set {name = value;}}
    public Role(int id_rol, string name)
    {
        this. id_rol = id_rol;
        this. name = name;
    }
}