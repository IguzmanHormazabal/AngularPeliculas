using Microsoft.EntityFrameworkCore;

namespace back_end.Utilidades
{

    //tercera parte para paginacion
    public static class HttpContextExtension
    {
        public async static Task InsertarParametroPaginacionEnCabecera<T>(this HttpContext httpContext,
            IQueryable<T> queryable)
        {
            if (httpContext == null) throw new ArgumentNullException(nameof(httpContext));

            double cantidad = await queryable.CountAsync();
            httpContext.Response.Headers.Add("cantidadTotalRegistros", cantidad.ToString());
        }
    }
}
