public abstract class User
{
    private int id_user;
    private string name;
    private string surname;
    private int cuil;
    private DateTime dateOfBirth;
    private string location;
    private int id_rol;
    private string email;
    private int cellphone;
    private int contactemergency;
    private string passwordHash;
    private bool stateUser;

    public int Id {get {return id_user;} set {id_user = value;}}
    public string Name {get {return name;} set {name = value;}}
    public string Surname {get {return surname;} set {surname = value;}}
    public int Cuil {get {return cuil;} set {cuil = value;}}
    public DateTime DateOfBirth {get {return dateOfBirth;} set {dateOfBirth = value;}}
    public string Location {get {return location;} set {location = value;}}
    public int IdRol {get {return id_rol;} set {id_rol = value;}}
    public string Email {get {return email;} set {email = value;}}
    public int Cellphone {get {return cellphone;} set {cellphone = value;}}
    public int ContactEmergency {get {return contactemergency;} set {contactemergency = value;}}
    public string PasswordHash {get {return passwordHash;} set {passwordHash = value;}}
    public bool StateUser {get {return stateUser;} set {stateUser = value;}}
    public User()
    {
    }

    public User(int id_user, string name, string surname, int cuil, DateTime dateOfBirth, string location, int id_rol, string email, int cellphone, int contactemergency, string passwordHash, bool stateUser)
    {
        this.id_user = id_user;
        this.name = name;
        this.surname = surname;
        this.cuil = cuil;
        this.dateOfBirth = dateOfBirth;
        this.location = location;
        this.id_rol = id_rol;
        this.email = email;
        this.cellphone = cellphone;
        this.contactemergency = contactemergency;
        this.passwordHash = passwordHash;
        this.stateUser = stateUser;
    }
}