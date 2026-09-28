public class AcademicSecretary : User
{
    private int idAcademicSecrectary;
    private string titlesJSON = string.Empty;

    public int IdAcademicSecrectary {get { return idAcademicSecrectary; } set { idAcademicSecrectary = value; }}
    public string TitlesJSON {get { return titlesJSON; } set { titlesJSON = value; }}
}