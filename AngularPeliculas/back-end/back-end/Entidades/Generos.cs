using back_end.Validaciones;
using System.ComponentModel.DataAnnotations;

namespace back_end.Entidades
{
    public class Generos
    {
        public int Id { get; set; }


        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 50)]
        [PrimeraClaseMayuscula] //validacion por atributo en este caso nombre
        public string Nombre { get; set; }

        public List<PeliculasGeneros> PeliculasGeneros { get; set; }

       
    }
}
