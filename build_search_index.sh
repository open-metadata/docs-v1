partials="partials"

for dir in content/*
  do 
    mydir="$(basename $dir)"
    if [ "$mydir" != "$partials" ]
      then
        npx pagefind --site .next/server/pages/"$mydir" --output-path .next/static/chunks/pages/pageFind"$mydir";
    fi
done
