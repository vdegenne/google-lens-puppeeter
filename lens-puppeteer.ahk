#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
;SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
;SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

!+s::
sleep 250
; Trigger the "take a screenshot" on Windows
Send #+s
; Input, key, L1 T1, % "{Escape}"
; (key = "") && key := "{" StrReplace(ErrorLevel, "EndKey:") "}"
; if (key="{Escape}") {
;   return
; }
KeyWait, LButton, D
KeyWait, Lbutton
;Sleep 200
; WinActivate, ahk_exe chrome.exe
; Send, ^t
; Send, ^v
; Send, {Enter}
; Sleep 100
; Open the server page in a new Chrome window
; Run, chrome.exe http://localhost:43191/ --new-window,, Max, PID
;Run, chrome.exe https://lens.google.com/search?p=ASQ0Rg2uxTXSxQvsyPkGYn21rwDt8WAUbrd5ZtAYvZ5awjMgJ6l_qdDtA1eFa5RaK1pA0sTpvavFoySSDTMJMpNCS07sZO7KiBIBYRR-GuSCTlQHxVrTKeUmPM1Szc9AJe01JMOwj7pw2ehbpviCe4E4EhTHM8lbhZLb9-sNL3RQT_MHdg-w9tbWWA0PwYR9CiwH3QWhik5tp663ZYPYPdFr1qXLKFG2OVSzUdeXtqkMuq-4_t48oRZ_VlUQLN_LfD12KeF56qeC78_nzTdMlV8z7Ed-TLMJdOJwtEqzPZwrpZFaAWf038u0PrF7&s&ep=cnts#lns=W251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsIkVpWUtKREZpT0dJek9UWmpMVEJsTkdNdE5EQXdaUzFpWmpVekxXSmxZV1UzTm1FeE9UYzFOdz09IixbWzUzLDQ1XV0sbnVsbCxudWxsLDJd,, Max, PID
; We Wait for the window to load completely
; WinMaximize
; Sleep 3000
; WinActivate, ahk_pid %PID%
;Sleep 1500
;MouseMove, 300, 400, 0
;MouseClick
;Send, ^v
sleep 200
Send, !l
Return
WinActivate, localhost:43191
; Wait the page to load completely (depends on your computer)
Sleep 2000
; Get the position of the just opened Chrome window
;WinGetPos, X, Y, W, H, A
; Try to move the mouse to a blank space on the page (ideally the most top left corner)
; MODIFY THE NUMBERS DEPENDING ON YOUR SCREEN RESOLUTION
MouseMove, 100, 300, 0
Send, ^v
;MouseGetPos, xpos, ypos
;MsgBox, %xpos%, %ypos%
Sleep 200
Send, {Click Right}
; Move cursor to "Search images with Google Lens"
; MODIFY THE VALUES DEPENDING ON YOUR ENVIRONMENT
MouseMove, 40, 130, 0, R
; Then Click "Search images with Google Lens"
Send, {Click}
;WinWaitActive, Google Lens
Sleep 20
Send, ^{Tab}
Send, ^w
;WinMaximize