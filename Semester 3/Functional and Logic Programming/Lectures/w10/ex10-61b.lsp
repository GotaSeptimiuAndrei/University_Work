(defun g (l)
  ((lambda (v)
    (cond
      ((null l) nil)
      (t (cons (car v) (cadr v)))
    )
   )
   (f l)
  )
)