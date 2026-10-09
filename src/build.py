import os, sys, fnmatch, re
import os.path
d = os.path.dirname(os.path.abspath(__file__))
args = sys.argv[1:]
out = 'out.html'; zz = None
if '--out' in args: out = args[args.index('--out') + 1]
if '--zz' in args: zz = args[args.index('--zz') + 1]   # only include expzz_* files matching this glob
exps = sorted((f for f in os.listdir(d) if f.startswith('exp') and f.endswith('.js')), key=lambda f: re.sub(r'\d+', lambda m: m.group().zfill(4), f))  # natural order: expg9 < expg10
if zz is not None: exps = [f for f in exps if not f.startswith('expzz_') or fnmatch.fnmatch(f, zz)]
order = ['core.js', 'theme.js', 'core3d.js', 'circuit.js', 'app.js', 'interact.js', 'laws.js', 'freelab.js'] + exps + ['examples.js', 'features.js', 'grades.js', 'device.js']
js = '\n'.join(open(os.path.join(d, f), encoding='utf-8').read() for f in order)
css = open(os.path.join(d, 'styles.css'), encoding='utf-8').read()
h = open(os.path.join(d, 'shell.html'), encoding='utf-8').read().replace('/*CSS*/', css).replace('/*JS*/', js)
open(os.path.join(d, '..', 'index.html') if out == 'out.html' else os.path.join(d, out), 'w', encoding='utf-8').write(h)
print(len(h), out, [f for f in order if f.startswith('expzz')])
