@echo off
COLOR A

echo BUILDING FOR PACKAGING...
call npm run winbuild

echo PACKAGING FOR DISTROBUTION...
call npm run buildinswin

echo CONCLUDED