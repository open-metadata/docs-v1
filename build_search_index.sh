partials="partials"

for dir in content/*
  do 
    mydir="$(basename $dir)"
    if [ "$mydir" != "$partials" ]
      then
        { # try
          npx pagefind --site .next/server/pages/"$mydir" --output-path .next/static/chunks/pages/pageFind"$mydir";
        } || { # catch
          echo "Search index creation for version $mydir FAILED!"
        }
    fi
done
