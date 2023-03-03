using back_end.Entidades;
using Microsoft.EntityFrameworkCore;

namespace back_end
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //llave primaria compuesta, segunda parte luego de las entidades
            modelBuilder.Entity<PeliculasActores>()
                .HasKey(x => new { x.ActorId, x.PeliculaId });
            modelBuilder.Entity<PeliculasGeneros>()
                .HasKey(x => new { x.PeliculaId, x.GeneroId });
            modelBuilder.Entity<PeliculasCines>()
                .HasKey(x => new { x.PeliculaId, x.CineId });

            base.OnModelCreating(modelBuilder); 
        }

        //las tablas de la base de datos 
        //al usar DbSet<Generos> saca los datos de la entidad Generos
        public DbSet<Generos> Generos { get; set; }
        public DbSet<Actor> Actores { get; set; }
        public DbSet<Cine> Cines { get; set; }
        public DbSet<Pelicula> Peliculas { get; set;}


        //db set para las entidades muchos a muchos 3° parte y ahora a hacer migracion
        public DbSet<PeliculasActores> PeliculasActores { get; set; }
        public DbSet<PeliculasGeneros>PeliculasGeneros { get; set;}
        public DbSet<PeliculasCines> PeliculasCines { get; set; }
    }
}
