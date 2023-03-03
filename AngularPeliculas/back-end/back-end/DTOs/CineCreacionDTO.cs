using System.ComponentModel.DataAnnotations;

namespace back_end.DTOs
{
    public class CineCreacionDTO
    {

        [Required]
        [StringLength(maximumLength:75)]
        public string Nombre { get; set; }

        //se utiliza latitud y longitud ya que pointer es complicado de manejar
        //luego con mapper se pasara la latitud y longitud al point de la entidad cine
        [Range(-90, 90)]
        public double Latitud { get; set; }
        [Range(-180, 180)]
        public double Longitud { get; set; }

    }
}
