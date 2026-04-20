import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Calendar as CalendarIcon, 
  Baby, 
  Plane, 
  Briefcase, 
  ChevronRight, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { calculateRetiro, calculateReintegro } from '@/lib/dates';
import { cn } from '@/lib/utils';
export function HomePage() {
  const [fppDate, setFppDate] = useState<Date | undefined>(undefined);
  const dates = useMemo(() => {
    if (!fppDate) return null;
    return {
      retiro: calculateRetiro(fppDate),
      fpp: fppDate,
      reintegro: calculateReintegro(fppDate),
    };
  }, [fppDate]);
  const formatDateLabel = (date: Date) => {
    return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-background to-rose-50 dark:from-pink-950/10 dark:via-background dark:to-rose-950/10 -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl -mr-48 -mt-48 dark:bg-pink-900/10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl -ml-48 -mb-48 dark:bg-rose-900/10" />
      <ThemeToggle />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12 lg:py-16">
          {/* Header Section */}
          <header className="text-center mb-12 md:mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculadora de Maternidad</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground text-balance">
              Licencia de <span className="text-gradient">Maternidad</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Planifica tu descanso y el regreso con tu bebé. Ingresa tu fecha probable de parto para calcular tus fechas clave.
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column: Calendar Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-soft glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-pink-500" />
                    Selecciona tu FPP
                  </CardTitle>
                  <CardDescription>
                    Fecha Probable de Parto estimada por tu médico.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center p-0 pb-6">
                  <Calendar
                    mode="single"
                    selected={fppDate}
                    onSelect={setFppDate}
                    className="rounded-md border-none"
                    locale={es}
                  />
                </CardContent>
              </Card>
            </motion.div>
            {/* Right Column: Results Timeline */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {!dates ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-muted rounded-3xl"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                      <CalendarIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Comienza aquí</h3>
                    <p className="text-muted-foreground max-w-xs">
                      Selecciona tu fecha probable de parto en el calendario para visualizar tu cronograma de licencia.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-6 relative"
                  >
                    {/* Timeline Vertical Line */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-pink-200 via-rose-200 to-transparent dark:from-pink-900/50 dark:via-rose-900/50 hidden md:block" />
                    {/* Milestone: Retiro */}
                    <motion.div variants={itemVariants} className="relative pl-0 md:pl-12 group">
                      <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border-4 border-pink-100 dark:border-pink-900/30 items-center justify-center z-10 group-hover:scale-110 transition-transform">
                        <Plane className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <Card className="hover:shadow-glow transition-shadow border-none glass-dark/5">
                        <CardHeader className="py-4 px-6 flex flex-row items-center justify-between space-y-0">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-1">
                              Inicio de Licencia (Retiro)
                            </p>
                            <CardTitle className="text-2xl font-bold">
                              {formatDateLabel(dates.retiro)}
                            </CardTitle>
                          </div>
                          <Plane className="w-6 h-6 text-muted-foreground/30 md:hidden" />
                        </CardHeader>
                        <CardContent className="px-6 pb-4">
                          <p className="text-sm text-muted-foreground">
                            Inicia tu descanso 41 días antes de la fecha probable de parto.
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                    {/* Milestone: FPP */}
                    <motion.div variants={itemVariants} className="relative pl-0 md:pl-12 group">
                      <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-pink-500 items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/20">
                        <Baby className="w-6 h-6 text-white" />
                      </div>
                      <Card className="border-pink-200 dark:border-pink-900 shadow-soft bg-pink-50/50 dark:bg-pink-950/10">
                        <CardHeader className="py-4 px-6 flex flex-row items-center justify-between space-y-0">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-1">
                              Fecha Probable de Parto (FPP)
                            </p>
                            <CardTitle className="text-2xl font-bold">
                              {formatDateLabel(dates.fpp)}
                            </CardTitle>
                          </div>
                          <Baby className="w-6 h-6 text-pink-500 md:hidden" />
                        </CardHeader>
                      </Card>
                    </motion.div>
                    {/* Milestone: Reintegro */}
                    <motion.div variants={itemVariants} className="relative pl-0 md:pl-12 group">
                      <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border-4 border-rose-100 dark:border-rose-900/30 items-center justify-center z-10 group-hover:scale-110 transition-transform">
                        <Briefcase className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      </div>
                      <Card className="hover:shadow-glow transition-shadow border-none glass-dark/5">
                        <CardHeader className="py-4 px-6 flex flex-row items-center justify-between space-y-0">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
                              Regreso al Trabajo (Reintegro)
                            </p>
                            <CardTitle className="text-2xl font-bold">
                              {formatDateLabel(dates.reintegro)}
                            </CardTitle>
                          </div>
                          <Briefcase className="w-6 h-6 text-muted-foreground/30 md:hidden" />
                        </CardHeader>
                        <CardContent className="px-6 pb-4">
                          <p className="text-sm text-muted-foreground">
                            Regreso previsto 57 días después de la fecha probable de parto.
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-center gap-2 p-4 rounded-2xl bg-muted/50 text-muted-foreground text-sm"
                    >
                      <Sparkles className="w-4 h-4 text-pink-500" />
                      Total de licencia estimada: 98 días.
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-muted-foreground border-t border-muted/20">
        <p className="text-sm">© {new Date().getFullYear()} Licencia de Maternidad. Herramienta informativa.</p>
      </footer>
      <Toaster richColors position="top-center" />
    </div>
  );
}