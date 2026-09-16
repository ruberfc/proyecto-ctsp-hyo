"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaBuilding, FaEye, FaEyeSlash, FaArrowCircleRight, FaEnvelope, FaKey, FaArrowLeft, FaUserTie, FaUserCheck } from 'react-icons/fa';
import { useAuthStore } from '@/store/authStore';
import { loginUsuario, solicitarRecuperacionUsuario, verificarRecuperacionUsuario, solicitarRecuperacionColegiado, verificarRecuperacionColegiado } from '@/app/intranet/api/network/ctsp';
import Response from '../intranet/api/model/class/response';
import RestError from '../intranet/api/model/class/restError';
import { Token } from '../intranet/api/model/interface/usuario';
import { ValueMsg } from '../intranet/api/model/interface/valueMsg';
import Link from 'next/link';
import toast from 'react-hot-toast';

function LoginPage() {
  // ========== ESTADOS LOGIN ==========
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const abortController = useRef(new AbortController());

  // ========== ESTADOS RECUPERACIÓN DE CONTRASEÑA ==========
  const [showRecovery, setShowRecovery] = useState(false);        // Modal abierto/cerrado
  const [recoveryStep, setRecoveryStep] = useState<'solicitar' | 'verificar'>('solicitar'); // Paso actual
  const [recoveryType, setRecoveryType] = useState<'usuario' | 'colegiado'>('usuario');      // Tipo: usuario o colegiado
  
  // Campos paso 1 (solicitar código)
  const [recoveryUsuario, setRecoveryUsuario] = useState('');
  const [recoveryCorreo, setRecoveryCorreo] = useState('');
  
  // Campos paso 2 (verificar código)
  const [recoveryCodigo, setRecoveryCodigo] = useState('');
  const [recoveryNuevaClave, setRecoveryNuevaClave] = useState('');
  const [recoveryConfirmarClave, setRecoveryConfirmarClave] = useState('');
  const [showRecoveryPassword, setShowRecoveryPassword] = useState(false);
  const [showRecoveryConfirmPassword, setShowRecoveryConfirmPassword] = useState(false);
  
  // Estados de carga y error para recuperación
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [recoveryError, setRecoveryError] = useState('');

  // ========== HANDLERS LOGIN ==========
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const body = { usuario, clave };

    const response = await loginUsuario<Token>(body, abortController.current);
    if (response instanceof Response) {
      const dataToken = response.data.access_token as string;
      setAuth(dataToken);
      router.push('/intranet');
    }
    if (response instanceof RestError) {
      setError(response.getMessage() || 'Error al iniciar sesión');
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // ========== HANDLERS RECUPERACIÓN ==========
  
  /** Abre el modal de recuperación */
  const openRecoveryModal = () => {
    setShowRecovery(true);
    setRecoveryStep('solicitar');
    setRecoveryType('usuario');
    clearRecoveryForm();
  };

  /** Cierra el modal y limpia el formulario */
  const closeRecoveryModal = () => {
    setShowRecovery(false);
    clearRecoveryForm();
  };

  /** Limpia todos los campos del formulario de recuperación */
  const clearRecoveryForm = () => {
    setRecoveryUsuario('');
    setRecoveryCorreo('');
    setRecoveryCodigo('');
    setRecoveryNuevaClave('');
    setRecoveryConfirmarClave('');
    setRecoveryError('');
    setRecoveryLoading(false);
  };

  /** Cambia entre tipo usuario/colegiado */
  const setRecoveryTypeHandler = (type: 'usuario' | 'colegiado') => {
    setRecoveryType(type);
    clearRecoveryForm();
  };

  /** Valida email formato básico */
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /** Valida código: exactamente 6 dígitos */
  const isValidCode = (code: string) => /^\d{6}$/.test(code);

  /** Paso 1: Solicitar código de recuperación */
  const handleSolicitarCodigo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRecoveryError('');
    setRecoveryLoading(true);

    // Validaciones cliente
    if (!recoveryUsuario.trim() || !recoveryCorreo.trim()) {
      setRecoveryError('Todos los campos son obligatorios');
      setRecoveryLoading(false);
      return;
    }
    if (!isValidEmail(recoveryCorreo)) {
      setRecoveryError('Ingrese un correo electrónico válido');
      setRecoveryLoading(false);
      return;
    }

    const body = recoveryType === 'usuario'
      ? { usuario: recoveryUsuario, correo_personal: recoveryCorreo }
      : { codigo_colegiado: recoveryUsuario, correo_personal: recoveryCorreo };

    try {
      const response = recoveryType === 'usuario'
        ? await solicitarRecuperacionUsuario(body, abortController.current)
        : await solicitarRecuperacionColegiado(body, abortController.current);

      if (response instanceof Response) {
        const data = response.data as ValueMsg[];
        if (data && data.length > 0 && data[0].value === 1) {
          // Éxito: avanzar al paso 2
          toast.success('Código enviado al correo');
          setRecoveryStep('verificar');
        } else {
          setRecoveryError(data[0]?.msg || 'Error al enviar código');
        }
      } else if (response instanceof RestError) {
        setRecoveryError(response.getMessage() || 'Error de conexión');
      }
    } catch (err) {
      setRecoveryError('Error inesperado, intente nuevamente');
    } finally {
      setRecoveryLoading(false);
    }
  };

  /** Paso 2: Verificar código y restablecer contraseña */
  const handleVerificarCodigo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRecoveryError('');
    setRecoveryLoading(true);

    // Validaciones cliente
    if (!recoveryCodigo.trim() || !recoveryNuevaClave.trim() || !recoveryConfirmarClave.trim()) {
      setRecoveryError('Todos los campos son obligatorios');
      setRecoveryLoading(false);
      return;
    }
    if (!isValidCode(recoveryCodigo)) {
      setRecoveryError('El código debe tener 6 dígitos');
      setRecoveryLoading(false);
      return;
    }
    if (recoveryNuevaClave !== recoveryConfirmarClave) {
      setRecoveryError('Las contraseñas no coinciden');
      setRecoveryLoading(false);
      return;
    }
    if (recoveryNuevaClave.length < 6) {
      setRecoveryError('La contraseña debe tener al menos 6 caracteres');
      setRecoveryLoading(false);
      return;
    }

    const body = recoveryType === 'usuario'
      ? { usuario: recoveryUsuario, codigo: recoveryCodigo, nueva_clave: recoveryNuevaClave, confirmar_clave: recoveryConfirmarClave }
      : { codigo_colegiado: recoveryUsuario, codigo: recoveryCodigo, nueva_clave: recoveryNuevaClave, confirmar_clave: recoveryConfirmarClave };

    try {
      const response = recoveryType === 'usuario'
        ? await verificarRecuperacionUsuario(body, abortController.current)
        : await verificarRecuperacionColegiado(body, abortController.current);

      if (response instanceof Response) {
        const data = response.data as ValueMsg[];
        if (data && data.length > 0 && data[0].value === 1) {
          // Éxito: cerrar modal y mostrar confirmación
          toast.success('Contraseña actualizada correctamente');
          setTimeout(() => closeRecoveryModal(), 1500);
        } else {
          setRecoveryError(data[0]?.msg || 'Error al restablecer contraseña');
        }
      } else if (response instanceof RestError) {
        setRecoveryError(response.getMessage() || 'Error de conexión');
      }
    } catch (err) {
      setRecoveryError('Error inesperado, intente nuevamente');
    } finally {
      setRecoveryLoading(false);
    }
  };

  /** Volver al paso 1 desde el paso 2 */
  const goBackToStep1 = () => {
    setRecoveryStep('solicitar');
    setRecoveryCodigo('');
    setRecoveryNuevaClave('');
    setRecoveryConfirmarClave('');
    setRecoveryError('');
  };

  // ========== RENDER ==========
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-200 to-blue-400 dark:from-[#0d1b2e] dark:via-[#101e33] dark:to-[#15233c] p-4">
      {/* Contenedor principal */}
      <div className="w-full max-w-md relative">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg dark:shadow-blue-950/50 mb-4">
            <FaBuilding className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-[#e8edf5]">
            Colegio de Trabajadores Sociales
          </h1>
          <p className="text-gray-600 dark:text-[#8fa3bf] mt-2">Accede a tu cuenta</p>
        </div>

        {/* ========== MODAL RECUPERACIÓN (Overlay) ========== */}
        {showRecovery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-white dark:bg-[#15233c] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#263551] animate-slide-up">
              {/* Header del modal */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#263551]">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-[#e8edf5]">
                  {recoveryStep === 'solicitar' ? 'Recuperar Contraseña' : 'Verificar Código'}
                </h2>
                <button
                  onClick={closeRecoveryModal}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-[#101e33] transition-colors"
                  aria-label="Cerrar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="p-6 space-y-6">
                {/* Paso 1: Seleccionar tipo y solicitar código */}
                {recoveryStep === 'solicitar' && (
                  <form onSubmit={handleSolicitarCodigo} className="space-y-5">
                    {/* Selector tipo: Usuario / Colegiado */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-[#c2cfe2]">
                        Tipo de cuenta
                      </label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setRecoveryTypeHandler('usuario')}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-200 ${
                            recoveryType === 'usuario'
                              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-[#33456a] dark:text-[#8fa3bf] dark:hover:border-[#33456a]'
                          }`}
                        >
                          <FaUser className="w-5 h-5" />
                          <span className="font-medium">Usuario</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRecoveryTypeHandler('colegiado')}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-200 ${
                            recoveryType === 'colegiado'
                              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-[#33456a] dark:text-[#8fa3bf] dark:hover:border-[#33456a]'
                          }`}
                        >
                          <FaUserTie className="w-5 h-5" />
                          <span className="font-medium">Colegiado</span>
                        </button>
                      </div>
                    </div>

                    {/* Campo: Usuario / Código Colegiado */}
                    <div className="space-y-2">
                      <label htmlFor="recoveryUsuario" className="block text-sm font-medium text-gray-700 dark:text-[#c2cfe2]">
                        {recoveryType === 'usuario' ? 'Usuario del sistema' : 'Código de colegiado'}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {recoveryType === 'usuario' ? (
                            <FaUser className="h-5 w-5 text-gray-400 dark:text-[#8fa3bf]" />
                          ) : (
                            <FaUserCheck className="h-5 w-5 text-gray-400 dark:text-[#8fa3bf]" />
                          )}
                        </div>
                        <input
                          id="recoveryUsuario"
                          type="text"
                          required
                          autoComplete="username"
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-[#101e33] dark:border-[#33456a] dark:text-[#e3e9f3] dark:placeholder-[#8fa3bf]"
                          placeholder={recoveryType === 'usuario' ? 'Ingresa tu usuario' : 'Ingresa tu código de colegiado'}
                          value={recoveryUsuario}
                          onChange={(e) => setRecoveryUsuario(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Campo: Correo electrónico */}
                    <div className="space-y-2">
                      <label htmlFor="recoveryCorreo" className="block text-sm font-medium text-gray-700 dark:text-[#c2cfe2]">
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="h-5 w-5 text-gray-400 dark:text-[#8fa3bf]" />
                        </div>
                        <input
                          id="recoveryCorreo"
                          type="email"
                          required
                          autoComplete="email"
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-[#101e33] dark:border-[#33456a] dark:text-[#e3e9f3] dark:placeholder-[#8fa3bf]"
                          placeholder="correo@ejemplo.com"
                          value={recoveryCorreo}
                          onChange={(e) => setRecoveryCorreo(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Mensaje de error */}
                    {recoveryError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl dark:bg-red-500/10 dark:border-red-500/40 animate-shake">
                        <p className="text-sm text-red-600 text-center dark:text-red-400">{recoveryError}</p>
                      </div>
                    )}

                    {/* Botón: Enviar código */}
                    <button
                      type="submit"
                      disabled={recoveryLoading}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-[#15233c] transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {recoveryLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <FaKey className="w-5 h-5 mr-2" />
                      )}
                      {recoveryLoading ? 'Enviando código...' : 'Enviar código de recuperación'}
                    </button>
                  </form>
                )}

                {/* Paso 2: Verificar código y nueva contraseña */}
                {recoveryStep === 'verificar' && (
                  <form onSubmit={handleVerificarCodigo} className="space-y-5">
                    {/* Indicador de paso */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-[#8fa3bf]">
                      <span className="flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium dark:bg-blue-900/30 dark:text-blue-400">1</span>
                        <span>Código enviado</span>
                      </span>
                      <span className="w-8 h-0.5 bg-blue-500"></span>
                      <span className="flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium">2</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">Nueva contraseña</span>
                      </span>
                    </div>

                    {/* Campo: Código 6 dígitos */}
                    <div className="space-y-2">
                      <label htmlFor="recoveryCodigo" className="block text-sm font-medium text-gray-700 dark:text-[#c2cfe2]">
                        Código de 6 dígitos
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaKey className="h-5 w-5 text-gray-400 dark:text-[#8fa3bf]" />
                        </div>
                        <input
                          id="recoveryCodigo"
                          type="text"
                          required
                          maxLength={6}
                          autoComplete="one-time-code"
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-[#101e33] dark:border-[#33456a] dark:text-[#e3e9f3] dark:placeholder-[#8fa3bf] text-center tracking-widest font-mono text-lg"
                          placeholder="0 0 0 0 0 0"
                          value={recoveryCodigo}
                          onChange={(e) => setRecoveryCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-[#8fa3bf] text-center">
                        Revisa tu correo (válido por 25 minutos)
                      </p>
                    </div>

                    {/* Campo: Nueva contraseña */}
                    <div className="space-y-2">
                      <label htmlFor="recoveryNuevaClave" className="block text-sm font-medium text-gray-700 dark:text-[#c2cfe2]">
                        Nueva contraseña
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400 dark:text-[#8fa3bf]" />
                        </div>
                        <input
                          id="recoveryNuevaClave"
                          type={showRecoveryPassword ? "text" : "password"}
                          required
                          autoComplete="new-password"
                          className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-[#101e33] dark:border-[#33456a] dark:text-[#e3e9f3] dark:placeholder-[#8fa3bf]"
                          placeholder="Mínimo 6 caracteres"
                          value={recoveryNuevaClave}
                          onChange={(e) => setRecoveryNuevaClave(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRecoveryPassword(!showRecoveryPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 dark:text-[#8fa3bf] dark:hover:text-[#e3e9f3]"
                        >
                          {showRecoveryPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Campo: Confirmar contraseña */}
                    <div className="space-y-2">
                      <label htmlFor="recoveryConfirmarClave" className="block text-sm font-medium text-gray-700 dark:text-[#c2cfe2]">
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400 dark:text-[#8fa3bf]" />
                        </div>
                        <input
                          id="recoveryConfirmarClave"
                          type={showRecoveryConfirmPassword ? "text" : "password"}
                          required
                          autoComplete="new-password"
                          className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-[#101e33] dark:border-[#33456a] dark:text-[#e3e9f3] dark:placeholder-[#8fa3bf]"
                          placeholder="Repite la nueva contraseña"
                          value={recoveryConfirmarClave}
                          onChange={(e) => setRecoveryConfirmarClave(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRecoveryConfirmPassword(!showRecoveryConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 dark:text-[#8fa3bf] dark:hover:text-[#e3e9f3]"
                        >
                          {showRecoveryConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Mensaje de error */}
                    {recoveryError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl dark:bg-red-500/10 dark:border-red-500/40 animate-shake">
                        <p className="text-sm text-red-600 text-center dark:text-red-400">{recoveryError}</p>
                      </div>
                    )}

                    {/* Botones: Restablecer + Volver */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={goBackToStep1}
                        className="flex-1 flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:border-[#33456a] dark:text-[#c2cfe2] dark:bg-[#101e33] dark:hover:bg-[#1a2a45] transition-all duration-200"
                      >
                        <FaArrowLeft className="w-5 h-5 mr-2" />
                        Volver
                      </button>
                      <button
                        type="submit"
                        disabled={recoveryLoading}
                        className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-[#15233c] transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {recoveryLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        ) : (
                          <FaUserCheck className="w-5 h-5 mr-2" />
                        )}
                        {recoveryLoading ? 'Restableciendo...' : 'Restablecer contraseña'}
                      </button>
                    </div>
                  </form>
                )}
                
              </div>
            </div>
          </div>
        )}

        {/* ========== FORMULARIO LOGIN PRINCIPAL ========== */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100 dark:bg-[#15233c]/90 dark:border-[#263551]">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo de usuario */}
            <div className="space-y-2">
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 dark:text-[#c2cfe2]">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400 dark:text-[#8fa3bf]" />
                </div>
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-[#101e33] dark:border-[#33456a] dark:text-[#e3e9f3] dark:placeholder-[#8fa3bf]"
                  placeholder="Ingresa tu usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-2">
              <label htmlFor="clave" className="block text-sm font-medium text-gray-700 dark:text-[#c2cfe2]">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400 dark:text-[#8fa3bf]" />
                </div>
                <input
                  id="clave"
                  name="clave"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-[#101e33] dark:border-[#33456a] dark:text-[#e3e9f3] dark:placeholder-[#8fa3bf]"
                  placeholder="Ingresa tu contraseña"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 dark:text-[#8fa3bf] dark:hover:text-[#e3e9f3]"
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mensaje de error login */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl dark:bg-red-500/10 dark:border-red-500/40">
                <p className="text-sm text-red-600 text-center dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Botón de login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-[#15233c] transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <FaArrowCircleRight className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
            </button>

            {/* Link to main website */}
            <div className="mt-4 text-center">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors duration-200 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Ir al Sitio Web
              </Link>
            </div>

            {/* Link: ¿Olvidaste tu contraseña? */}
            {/* <div className="mt-4 text-center">
              <button
                type="button"
                onClick={openRecoveryModal}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors duration-200 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div> */}
            
          </form>
        </div>

        {/* Footer de la página */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-[#8fa3bf]">
            © {new Date().getFullYear()} Junín - Huancayo
          </p>
        </div>
      </div>

      {/* Estilos dinámicos para animaciones del modal */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
}

export default LoginPage;