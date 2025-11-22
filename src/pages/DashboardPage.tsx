

export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-fondo font-sans text-texto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-secundario shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-principal">CIFRA TECH</span>
              </div>
              <nav className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10">Dashboard</a>
                <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white">Proyectos</a>
                <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white">Reportes</a>
              </nav>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">Admin User</span>
                <div className="h-8 w-8 rounded-full bg-principal/20 flex items-center justify-center text-principal font-bold border border-principal">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-texto">Dashboard General</h1>
          <p className="mt-2 text-sm text-gray-500">Bienvenido al panel de control de Cifra Tech.</p>
        </div>

        {/* Metrics Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Metric 1 */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border-t-4 border-acento">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-acento/10 text-acento">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">Total Usuarios</dt>
                    <dd>
                      <div className="text-lg font-bold text-texto">2,450</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border-t-4 border-aprobado">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-aprobado/10 text-aprobado">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">Proyectos Activos</dt>
                    <dd>
                      <div className="text-lg font-bold text-texto">12</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border-t-4 border-pendiente">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-pendiente/10 text-pendiente">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">Pendientes</dt>
                    <dd>
                      <div className="text-lg font-bold text-texto">5</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border-t-4 border-rechazado">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-rechazado/10 text-rechazado">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">Alertas</dt>
                    <dd>
                      <div className="text-lg font-bold text-texto">3</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Panel (Actions & Table) */}
          <div className="flex-1 space-y-6 lg:w-3/4">
            {/* Actions */}
            <div className="flex flex-wrap gap-4 rounded-xl bg-white p-6 shadow-sm">
              <button className="inline-flex items-center rounded-xl bg-principal px-4 py-2 text-sm font-semibold text-secundario shadow-sm hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-principal focus:ring-offset-2">
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nuevo Proyecto
              </button>
              <button className="inline-flex items-center rounded-xl bg-acento px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-acento focus:ring-offset-2">
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Exportar Datos
              </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium leading-6 text-texto">Proyectos Recientes</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nombre</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estado</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Cliente</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Fecha</th>
                      <th scope="col" className="relative px-6 py-3"><span className="sr-only">Editar</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <tr key={item} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"></div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-texto">Proyecto Alpha {item}</div>
                              <div className="text-sm text-gray-500">Desarrollo Web</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            item % 3 === 0 ? 'bg-rechazado/10 text-rechazado' : 
                            item % 2 === 0 ? 'bg-aprobado/10 text-aprobado' : 
                            'bg-pendiente/10 text-pendiente'
                          }`}>
                            {item % 3 === 0 ? 'Retrasado' : item % 2 === 0 ? 'Completado' : 'En Progreso'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">Empresa XYZ</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">20 Nov 2023</td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <a href="#" className="text-acento hover:text-blue-900">Editar</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Panel (Notifications) */}
          <div className="lg:w-1/4">
            <div className="rounded-xl bg-white shadow-sm">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium leading-6 text-texto">Notificaciones</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="rounded-lg border border-info/20 bg-info/5 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-info">Nueva actualización</h3>
                      <div className="mt-2 text-sm text-info/80">
                        <p>El sistema se actualizará esta noche a las 22:00.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-pendiente/20 bg-pendiente/5 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-pendiente" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-pendiente">Revisión pendiente</h3>
                      <div className="mt-2 text-sm text-pendiente/80">
                        <p>Tienes 3 reportes esperando aprobación.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-aprobado/20 bg-aprobado/5 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-aprobado" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-aprobado">Tarea completada</h3>
                      <div className="mt-2 text-sm text-aprobado/80">
                        <p>La exportación de datos finalizó correctamente.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
